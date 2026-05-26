import { render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ADMIN_AUTH_ERROR_CODES } from '@ashikur-portfolio/shared/api';
import { ChangePasswordPage } from './src/app/change-password/ChangePasswordPage';
import { AdminProfilePage } from './src/app/AdminProfilePage';
import { LoginPage } from './src/app/login/LoginPage';
import { AdminAuthProvider } from './src/auth/AdminAuthProvider';
import { ADMIN_AUTH_COPY } from './src/auth/messages';
import { ADMIN_APP_ROUTES } from './src/auth/routes';
import { adminUser, server } from './vitest.setup';

const replaceMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: vi.fn(),
  }),
}));

function renderWithAuth(ui: ReactElement) {
  return render(<AdminAuthProvider>{ui}</AdminAuthProvider>);
}

/** FormField appends sr-only "(required)" to accessible names. */
function fieldLabel(text: string) {
  return screen.getByLabelText(text, { exact: false });
}

describe('LoginPage', () => {
  beforeEach(() => {
    replaceMock.mockClear();
  });

  it('renders login page with accessible fields', async () => {
    renderWithAuth(<LoginPage />);
    expect(await screen.findByTestId('admin-login-page')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: ADMIN_AUTH_COPY.loginTitle }),
    ).toBeInTheDocument();
    expect(fieldLabel(ADMIN_AUTH_COPY.usernameOrEmailLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(ADMIN_AUTH_COPY.passwordLabel)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ADMIN_AUTH_COPY.signIn })).toBeInTheDocument();
  });

  it('disables submit when required fields are empty', async () => {
    renderWithAuth(<LoginPage />);
    await screen.findByTestId('admin-login-page');
    expect(screen.getByRole('button', { name: ADMIN_AUTH_COPY.signIn })).toBeDisabled();
  });

  it('disables submit while loading', async () => {
    let resolveLogin!: () => void;
    const pending = new Promise<void>((resolve) => {
      resolveLogin = resolve;
    });
    server.use(
      http.post('*/api/admin/auth/login/', async () => {
        await pending;
        return HttpResponse.json(adminUser);
      }),
    );

    const user = userEvent.setup();
    renderWithAuth(<LoginPage />);
    await screen.findByTestId('admin-login-page');

    await user.type(fieldLabel(ADMIN_AUTH_COPY.usernameOrEmailLabel), 'admin');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.passwordLabel), 'correct');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.signIn }));

    expect(screen.getByRole('button', { name: ADMIN_AUTH_COPY.signingIn })).toBeDisabled();
    resolveLogin();
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(ADMIN_APP_ROUTES.profile);
    });
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginPage />);
    await screen.findByTestId('admin-login-page');

    const password = screen.getByLabelText(ADMIN_AUTH_COPY.passwordLabel);
    expect(password).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.showPassword }));
    expect(password).toHaveAttribute('type', 'text');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.hidePassword }));
    expect(password).toHaveAttribute('type', 'password');
  });

  it('shows friendly error on failed login without raw API text', async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginPage />);
    await screen.findByTestId('admin-login-page');

    await user.type(fieldLabel(ADMIN_AUTH_COPY.usernameOrEmailLabel), 'admin');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.passwordLabel), 'wrong');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.signIn }));

    expect(await screen.findByText(ADMIN_AUTH_COPY.invalidLogin)).toBeInTheDocument();
    expect(screen.queryByText(/INVALID_CREDENTIALS/i)).not.toBeInTheDocument();
  });

  it('redirects to profile after successful login', async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginPage />);
    await screen.findByTestId('admin-login-page');

    await user.type(fieldLabel(ADMIN_AUTH_COPY.usernameOrEmailLabel), 'admin');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.passwordLabel), 'correct');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.signIn }));

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(ADMIN_APP_ROUTES.profile);
    });
  });
});

describe('Admin profile and route guards', () => {
  beforeEach(() => {
    replaceMock.mockClear();
  });

  it('redirects unauthenticated users away from profile', async () => {
    renderWithAuth(<AdminProfilePage />);
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(ADMIN_APP_ROUTES.login);
    });
    expect(screen.queryByTestId('admin-profile-name')).not.toBeInTheDocument();
  });

  it('shows loading state while checking auth', () => {
    renderWithAuth(<AdminProfilePage />);
    expect(screen.getByTestId('admin-auth-loading')).toBeInTheDocument();
  });

  it('renders profile for authenticated user', async () => {
    server.use(http.get('*/api/admin/auth/me/', () => HttpResponse.json(adminUser)));

    renderWithAuth(<AdminProfilePage />);

    expect(await screen.findByTestId('admin-profile-name')).toHaveTextContent(adminUser.name);
    expect(screen.getByTestId('admin-profile-username')).toHaveTextContent(adminUser.username);
    expect(screen.getByTestId('admin-profile-email')).toHaveTextContent(adminUser.email);
    expect(
      screen.getByText(`${ADMIN_AUTH_COPY.staffStatus}: ${ADMIN_AUTH_COPY.yes}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${ADMIN_AUTH_COPY.superuserStatus}: ${ADMIN_AUTH_COPY.yes}`),
    ).toBeInTheDocument();
  });

  it('redirects authenticated users away from login page', async () => {
    server.use(http.get('*/api/admin/auth/me/', () => HttpResponse.json(adminUser)));

    renderWithAuth(<LoginPage />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(ADMIN_APP_ROUTES.profile);
    });
  });

  it('logout clears session and redirects to login', async () => {
    server.use(http.get('*/api/admin/auth/me/', () => HttpResponse.json(adminUser)));

    const user = userEvent.setup();
    renderWithAuth(<AdminProfilePage />);
    await screen.findByTestId('admin-profile-name');

    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.logout }));

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(ADMIN_APP_ROUTES.login);
    });
  });

  it('shows permission message when me returns forbidden', async () => {
    server.use(
      http.get('*/api/admin/auth/me/', () =>
        HttpResponse.json(
          {
            success: false,
            error: {
              code: ADMIN_AUTH_ERROR_CODES.adminForbidden,
              message: ADMIN_AUTH_COPY.unauthorized,
              details: {},
            },
          },
          { status: 403 },
        ),
      ),
    );

    renderWithAuth(<AdminProfilePage />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(ADMIN_APP_ROUTES.login);
    });
  });

  it('opens edit profile form with current values and saves', async () => {
    let profile = { ...adminUser };
    server.use(
      http.get('*/api/admin/auth/me/', () => HttpResponse.json(profile)),
      http.patch('*/api/admin/auth/me/', async ({ request }) => {
        const body = (await request.json()) as {
          firstName?: string;
          lastName?: string;
          email?: string;
        };
        profile = {
          ...profile,
          firstName: body.firstName ?? profile.firstName,
          lastName: body.lastName ?? profile.lastName,
          email: body.email ?? profile.email,
          name: `${body.firstName ?? profile.firstName} ${body.lastName ?? profile.lastName}`,
        };
        return HttpResponse.json(profile);
      }),
    );

    const user = userEvent.setup();
    renderWithAuth(<AdminProfilePage />);
    await screen.findByTestId('admin-profile-name');

    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.editProfile }));
    expect(fieldLabel(ADMIN_AUTH_COPY.firstNameLabel)).toHaveValue(adminUser.firstName);
    expect(fieldLabel(ADMIN_AUTH_COPY.emailLabel)).toHaveValue(adminUser.email);

    await user.clear(fieldLabel(ADMIN_AUTH_COPY.emailLabel));
    await user.type(fieldLabel(ADMIN_AUTH_COPY.emailLabel), 'updated@example.com');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.saveProfile }));

    expect(await screen.findByTestId('admin-profile-success')).toHaveTextContent(
      ADMIN_AUTH_COPY.profileSaved,
    );
    expect(screen.getByTestId('admin-profile-email')).toHaveTextContent('updated@example.com');
  });

  it('shows friendly validation error on profile save failure', async () => {
    server.use(
      http.get('*/api/admin/auth/me/', () => HttpResponse.json(adminUser)),
      http.patch('*/api/admin/auth/me/', () =>
        HttpResponse.json(
          {
            success: false,
            error: {
              code: ADMIN_AUTH_ERROR_CODES.validation,
              message: 'Please check your input and try again.',
              details: { email: ['Enter a valid email address.'] },
            },
          },
          { status: 400 },
        ),
      ),
    );

    const user = userEvent.setup();
    renderWithAuth(<AdminProfilePage />);
    await screen.findByTestId('admin-profile-name');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.editProfile }));
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.saveProfile }));

    expect(await screen.findByTestId('admin-profile-error')).toBeInTheDocument();
    expect(screen.queryByText(/VALIDATION_ERROR/i)).not.toBeInTheDocument();
  });
});

describe('ChangePasswordPage', () => {
  beforeEach(() => {
    server.use(http.get('*/api/admin/auth/me/', () => HttpResponse.json(adminUser)));
  });

  it('renders the page title as the primary heading', async () => {
    renderWithAuth(<ChangePasswordPage />);
    await screen.findByTestId('admin-change-password-page');

    expect(
      screen.getByRole('heading', { level: 1, name: ADMIN_AUTH_COPY.changePasswordTitle }),
    ).toBeInTheDocument();
  });

  it('shows mismatch error before submit', async () => {
    const user = userEvent.setup();
    renderWithAuth(<ChangePasswordPage />);
    await screen.findByTestId('admin-change-password-page');

    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.currentPasswordLabel), 'current');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.newPasswordLabel), 'NewPass123!');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.confirmPasswordLabel), 'OtherPass123!');

    expect(screen.getByText(ADMIN_AUTH_COPY.passwordMismatch)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ADMIN_AUTH_COPY.updatePassword })).toBeDisabled();
  });

  it('shows success and clears fields after password change', async () => {
    server.use(
      http.post('*/api/admin/auth/change-password/', () => HttpResponse.json({ success: true })),
    );

    const user = userEvent.setup();
    renderWithAuth(<ChangePasswordPage />);
    await screen.findByTestId('admin-change-password-page');

    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.currentPasswordLabel), 'current');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.newPasswordLabel), 'NewPass123!');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.confirmPasswordLabel), 'NewPass123!');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.updatePassword }));

    expect(await screen.findByTestId('admin-change-password-success')).toHaveTextContent(
      ADMIN_AUTH_COPY.passwordUpdated,
    );
    expect(screen.getByLabelText(ADMIN_AUTH_COPY.currentPasswordLabel)).toHaveValue('');
    expect(screen.getByLabelText(ADMIN_AUTH_COPY.newPasswordLabel)).toHaveValue('');
  });

  it('shows friendly error for wrong current password', async () => {
    server.use(
      http.post('*/api/admin/auth/change-password/', () =>
        HttpResponse.json(
          {
            success: false,
            error: {
              code: ADMIN_AUTH_ERROR_CODES.invalidCurrentPassword,
              message: ADMIN_AUTH_COPY.currentPasswordWrong,
            },
          },
          { status: 400 },
        ),
      ),
    );

    const user = userEvent.setup();
    renderWithAuth(<ChangePasswordPage />);
    await screen.findByTestId('admin-change-password-page');

    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.currentPasswordLabel), 'wrong');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.newPasswordLabel), 'NewPass123!');
    await user.type(screen.getByLabelText(ADMIN_AUTH_COPY.confirmPasswordLabel), 'NewPass123!');
    await user.click(screen.getByRole('button', { name: ADMIN_AUTH_COPY.updatePassword }));

    expect(await screen.findByTestId('admin-change-password-error')).toHaveTextContent(
      ADMIN_AUTH_COPY.currentPasswordWrong,
    );
    expect(screen.queryByText(/INVALID_CURRENT_PASSWORD/i)).not.toBeInTheDocument();
  });
});
