'use client';

import { getHello } from '@ashikur-portfolio/shared/api/hello';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ErrorState,
  LoadingState,
  Navbar,
  PageShell,
} from '@ashikur-portfolio/shared/ui';
import { useApi } from '@ashikur-portfolio/shared/hooks/useApi';

export function HomePage() {
  const { state, reload } = useApi(() => getHello());
  const isLoading = state.status === 'loading';

  return (
    <PageShell
      header={
        <Navbar
          appName="Ashikur Portfolio"
          items={[
            { label: 'Home', href: '/', active: true },
            { label: 'Projects', href: '/projects' },
            { label: 'About', href: '/about' },
          ]}
        />
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ashikur Portfolio</CardTitle>
            <CardDescription>
              Personal site for projects, experience, and contact. Content sections will be added
              here as the portfolio grows.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="default" size="md">
              View projects
            </Button>
            <Button variant="outline" size="md">
              Get in touch
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API status</CardTitle>
            <CardDescription>
              Backend health check via{' '}
              <code className="font-mono text-xs">@ashikur-portfolio/shared/api</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              type="button"
              onClick={() => void reload()}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'Loading hello...' : 'Reload hello'}
            </Button>

            {state.status === 'loading' || state.status === 'idle' ? <LoadingState /> : null}
            {state.status === 'error' ? <ErrorState message={state.error} /> : null}
            {state.status === 'success' ? (
              <p data-testid="hello-message" className="text-sm text-foreground">
                {state.data.message}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
