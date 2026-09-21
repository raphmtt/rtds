import {
  ThemeProvider,
  BrandProvider,
  SiteShell,
  SiteHeader,
  SiteFooter,
  AnnouncementBar,
  Hero,
  Section,
  Container,
  Stack,
  Grid,
  FeatureGrid,
  FeatureGridItem,
  FeatureSplit,
  LogoCloud,
  StatsRow,
  StatItem,
  PricingTable,
  PricingTier,
  Testimonial,
  TestimonialGrid,
  FAQ,
  CTASection,
  ContactForm,
  NewsletterForm,
  Button,
  ModeToggle,
  ModeSelect,
  BrandSelect,
  Icon,
  ICON_SIZE_FEATURE,
  useBrand,
  useTheme,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  ErrorState,
  FormField,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextLink,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rtds/ui';
import { brandLabels } from '@rtds/tokens';
import {
  Zap,
  Shield,
  Palette,
  Globe,
  Lock,
  Sparkles,
  Github,
  Twitter,
  Inbox,
  Info,
} from 'lucide-react';

const Logo = () => (
  <a href="/" className="font-heading font-bold text-xl text-foreground">
    RTDS
  </a>
);

const wordmark = (name: string) => (
  <span className="font-heading text-xl font-semibold tracking-tight">{name}</span>
);

const navItems = [
  { label: 'Primitives', href: '#primitives' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Stories', href: '#stories' },
  { label: 'FAQ', href: '#faq' },
];

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#primitives' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#faq' },
      { label: 'Storybook', href: '/storybook' },
      { label: 'GitHub', href: '#contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#stories' },
      { label: 'Blog', href: '#features' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const faqItems = [
  {
    question: 'What is included in the design system?',
    answer:
      'The design system includes foundational components, marketing blocks, layout utilities, and a complete theming system with three niches (atlas, folio, maison) and dark mode.',
  },
  {
    question: 'How do I customize the theme?',
    answer:
      'This demo owns `apps/demo/themes/*.theme.rtds.json` and runs the first-party generator. Product apps do the same with one file, import that generated CSS plus `@rtds/ui/base.css`, and toggle `.dark` on `<html>`. See docs/THEMING.md.',
  },
  {
    question: 'Is the design system accessible?',
    answer:
      'Yes. Palettes target WCAG 2.2 AA contrast. Components include focus management, keyboard navigation, and ARIA attributes.',
  },
  {
    question: 'Can I use this with other frameworks?',
    answer:
      'The design system is built for React 19 but the token and CSS architecture can be adapted. The Tailwind preset works with any project that uses Tailwind CSS v4.',
  },
];

const pricingFeatures = {
  starter: [
    { text: 'Core primitives', included: true },
    { text: 'Generated theme CSS', included: true },
    { text: 'Email support', included: false },
    { text: 'Custom niches', included: false },
  ],
  growth: [
    { text: 'Core primitives', included: true },
    { text: 'Generated theme CSS', included: true },
    { text: 'Email support', included: true },
    { text: 'Custom niches', included: false },
  ],
  scale: [
    { text: 'Core primitives', included: true },
    { text: 'Generated theme CSS', included: true },
    { text: 'Email support', included: true },
    { text: 'Custom niches', included: true },
  ],
};

function Landing() {
  const { brand } = useBrand();
  const { resolvedMode } = useTheme();
  const niche = brandLabels[brand];

  return (
    <SiteShell>
      <AnnouncementBar
        message="Primitives now wrap Base UI. Storybook is the catalog."
        action={{ label: 'See primitives', href: '#primitives' }}
        storageKey="rtds-demo-announcement"
      />
      <SiteHeader
        logo={<Logo />}
        navItems={navItems}
        cta={{ label: 'Get Started', href: '#contact' }}
        themeControls={
          <>
            <span className="hidden md:inline max-w-[8.5rem] text-right text-[10px] leading-tight text-muted-foreground">
              Demo playground — real apps ship one theme file
            </span>
            <BrandSelect />
            <ModeToggle />
          </>
        }
      />

      <main id="main-content">
        <Hero
          eyebrow={`${niche} · ${resolvedMode}`}
          title="Build beautiful landing pages faster"
          description="Switch playground theme and color mode in the header — CSS is generated from this app's own JSON. Real apps ship one theme file. Lucide icons, Instrument Serif display, Inter, JetBrains Mono."
          align="center"
          actions={
            <>
              <Button size="lg">View Documentation</Button>
              <Button size="lg" variant="outline">
                Open Storybook
              </Button>
            </>
          }
        />

        <LogoCloud
          title="Built to compose the same blocks product apps ship"
          logos={[
            { name: 'Northwind', logo: wordmark('Northwind') },
            { name: 'Helios', logo: wordmark('Helios') },
            { name: 'Kinetic', logo: wordmark('Kinetic') },
            { name: 'Harbor', logo: wordmark('Harbor') },
            { name: 'Lumen', logo: wordmark('Lumen') },
          ]}
        />

        <Section id="button-poc">
          <Container>
            <h2 className="font-heading text-3xl font-bold text-center mb-3">Button</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              1:1 Base UI wrapper styled with CSS tokens. Switch {niche} × {resolvedMode} in
              the header — these restyle with no code edits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Container>
        </Section>

        <Section id="primitives">
          <Container>
            <Stack gap={8}>
              <div className="text-center">
                <h2 className="font-heading text-3xl font-bold mb-3">Primitives</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Remaining interactive wrappers now sit on Base UI. Open dialogs and sheets,
                  switch tabs, and toggle controls — they restyle with the header playground
                  theme.
                </p>
              </div>

              <Grid cols={2} gap={8}>
                <div className="space-y-4 rounded-lg border p-6">
                  <h3 className="font-heading text-lg font-semibold">Dialog & Sheet</h3>
                  <div className="flex flex-wrap gap-3">
                    <Dialog>
                      <DialogTrigger render={<Button variant="outline" />}>
                        Open dialog
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Base UI dialog</DialogTitle>
                          <DialogDescription>
                            Focus stays inside the popup. Close with the button, overlay, or
                            Escape.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose render={<Button type="button" variant="outline" />}>
                            Close
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Sheet>
                      <SheetTrigger render={<Button variant="secondary" />}>
                        Open sheet
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Navigation sheet</SheetTitle>
                          <SheetDescription>
                            Drawer from the right edge. Swipe or use the close control.
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                <div className="space-y-4 rounded-lg border p-6">
                  <h3 className="font-heading text-lg font-semibold">Select & Tabs</h3>
                  <Select defaultValue="atlas">
                    <SelectTrigger aria-label="Example select">
                      <SelectValue placeholder="Choose a niche" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="atlas">Atlas</SelectItem>
                      <SelectItem value="folio">Folio</SelectItem>
                      <SelectItem value="maison">Maison</SelectItem>
                    </SelectContent>
                  </Select>
                  <Tabs defaultValue="one">
                    <TabsList>
                      <TabsTrigger value="one">One</TabsTrigger>
                      <TabsTrigger value="two">Two</TabsTrigger>
                      <TabsTrigger value="three">Three</TabsTrigger>
                    </TabsList>
                    <TabsContent value="one">First panel.</TabsContent>
                    <TabsContent value="two">Second panel.</TabsContent>
                    <TabsContent value="three">Third panel.</TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4 rounded-lg border p-6">
                  <h3 className="font-heading text-lg font-semibold">Checkbox, Switch, Tooltip</h3>
                  <div className="flex items-center gap-2">
                    <Checkbox id="demo-check" defaultChecked />
                    <Label htmlFor="demo-check">Accept tokens</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="demo-switch" defaultChecked />
                    <Label htmlFor="demo-switch">Dark-ready</Label>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger render={<Button variant="ghost" size="sm" />}>
                        Hover me
                      </TooltipTrigger>
                      <TooltipContent>Token-styled tooltip</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-4 rounded-lg border p-6">
                  <h3 className="font-heading text-lg font-semibold">Accordion, Avatar, Link</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage alt="Ada" src="https://i.pravatar.cc/80?img=5" />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <TextLink href="#faq">Read the FAQ</TextLink>
                  </div>
                  <Separator />
                  <Accordion className="w-full">
                    <AccordionItem value="a">
                      <AccordionTrigger>What changed?</AccordionTrigger>
                      <AccordionContent>
                        Interactive primitives wrap Base UI. Visuals still use semantic tokens.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="b">
                      <AccordionTrigger>Is Radix gone?</AccordionTrigger>
                      <AccordionContent>
                        Yes from `@rtds/ui` sources. Button was the reference; this inventory
                        matches it.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="space-y-4 rounded-lg border p-6">
                  <h3 className="font-heading text-lg font-semibold">Badge, Alert, Skeleton</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                  <Alert>
                    <Icon icon={Info} />
                    <AlertTitle>Theme tokens</AlertTitle>
                    <AlertDescription>
                      This alert follows {niche} × {resolvedMode} from the header.
                    </AlertDescription>
                  </Alert>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2">
                      <Skeleton className="h-3 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Form field</CardTitle>
                    <CardDescription>
                      Input, textarea, and ModeSelect on the same card.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stack gap={4}>
                      <FormField label="Email" htmlFor="demo-email" hint="We never share this.">
                        <Input id="demo-email" type="email" placeholder="you@example.com" />
                      </FormField>
                      <FormField label="Notes" htmlFor="demo-notes">
                        <Textarea id="demo-notes" rows={3} placeholder="Optional context" />
                      </FormField>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Color mode</p>
                        <ModeSelect />
                      </div>
                    </Stack>
                  </CardContent>
                  <CardFooter>
                    <Button>Save draft</Button>
                  </CardFooter>
                </Card>
              </Grid>
            </Stack>
          </Container>
        </Section>

        <Section id="features" tone="muted">
          <FeatureGrid
            title="Everything you need"
            description="Built with modern best practices for performance, accessibility, and developer experience."
            columns={3}
          >
            <FeatureGridItem
              icon={<Icon icon={Zap} size={ICON_SIZE_FEATURE} />}
              title="Lightning Fast"
              description="Optimized for performance with minimal JavaScript and efficient CSS."
            />
            <FeatureGridItem
              icon={<Icon icon={Shield} size={ICON_SIZE_FEATURE} />}
              title="Accessible"
              description="WCAG 2.2 AA compliant with proper focus management and ARIA support."
            />
            <FeatureGridItem
              icon={<Icon icon={Palette} size={ICON_SIZE_FEATURE} />}
              title="Themeable"
              description="This demo hosts atlas, folio, and maison JSON and generates CSS locally. Real apps ship one generated theme file."
            />
            <FeatureGridItem
              icon={<Icon icon={Globe} size={ICON_SIZE_FEATURE} />}
              title="Responsive"
              description="Mobile-first design tested at 375px and 1440px breakpoints."
            />
            <FeatureGridItem
              icon={<Icon icon={Lock} size={ICON_SIZE_FEATURE} />}
              title="Type Safe"
              description="Full TypeScript support with strict type checking and autocompletion."
            />
            <FeatureGridItem
              icon={<Icon icon={Sparkles} size={ICON_SIZE_FEATURE} />}
              title="Modern Stack"
              description="React 19, Tailwind v4, and 1:1 Base UI wrappers styled with CSS tokens."
            />
          </FeatureGrid>
        </Section>

        <FeatureSplit
          eyebrow="Tokens first"
          title="One theme file, every surface"
          description="Product apps import generated CSS plus @rtds/ui/base.css. Switch the playground in the header to see the same split restyle in place."
          media={
            <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-muted-foreground">
              Theme preview
            </div>
          }
          actions={
            <>
              <Button>Read theming docs</Button>
              <Button variant="outline">Open Storybook</Button>
            </>
          }
        />

        <Section id="stats">
          <Container>
            <h2 className="font-heading text-3xl font-bold text-center mb-8">
              Built for scale
            </h2>
          </Container>
          <StatsRow>
            <StatItem value="50+" label="Components" />
            <StatItem value="3" label="Niches" />
            <StatItem value="6" label="Theme variants" />
            <StatItem value="AA" label="WCAG Compliant" />
          </StatsRow>
        </Section>

        <PricingTable
          id="pricing"
          className="bg-muted"
          title="Simple pricing"
          description="Start with tokens and grow into a full landing kit."
        >
          <PricingTier
            name="Starter"
            description="For a first product surface."
            price="$0"
            features={pricingFeatures.starter}
            cta={{ label: 'Get started', href: '#contact' }}
          />
          <PricingTier
            name="Growth"
            description="For teams shipping marketing sites."
            price="$49"
            featured
            features={pricingFeatures.growth}
            cta={{ label: 'Start trial', href: '#contact' }}
          />
          <PricingTier
            name="Scale"
            description="For multi-brand playgrounds."
            price="$99"
            features={pricingFeatures.scale}
            cta={{ label: 'Talk to us', href: '#contact' }}
          />
        </PricingTable>

        <TestimonialGrid
          id="stories"
          title="Teams shipping with RTDS"
          description="The same blocks you just scrolled — header, pricing, and forms — restyle from tokens."
        >
          <Testimonial
            quote="We swapped the theme file and the landing restyled without touching components."
            author={{ name: 'Ada Lovelace', title: 'Staff engineer', company: 'Northwind' }}
          />
          <Testimonial
            quote="Storybook and the demo finally show the same primitives. Reviews got shorter."
            author={{ name: 'Grace Hopper', title: 'Design lead', company: 'Helios' }}
          />
          <Testimonial
            quote="Base UI wrappers kept a11y behavior while our CVA styles stayed intact."
            author={{ name: 'Alan Kay', title: 'Frontend', company: 'Kinetic' }}
          />
        </TestimonialGrid>

        <Section tone="muted">
          <Container>
            <Grid cols={2} gap={8}>
              <div className="rounded-lg border bg-background">
                <EmptyState
                  icon={<Icon icon={Inbox} />}
                  title="No changelog yet"
                  description="New releases will land here. Storybook already lists every public export."
                  actions={<Button variant="outline">Open Storybook</Button>}
                />
              </div>
              <div className="rounded-lg border bg-background">
                <ErrorState
                  title="Could not load a preview"
                  description="Feedback states use the same tokens as the rest of the landing."
                  onRetry={() => undefined}
                />
              </div>
            </Grid>
          </Container>
        </Section>

        <Section id="faq">
          <FAQ
            title="Frequently asked questions"
            description="Find answers to common questions about the design system."
            items={faqItems}
          />
        </Section>

        <Section tone="muted">
          <Container>
            <Stack gap={8} align="center">
              <div className="text-center max-w-xl">
                <h2 className="font-heading text-3xl font-bold">Stay in the loop</h2>
                <p className="mt-2 text-muted-foreground">
                  Newsletter is a compact form. The contact card below is the full block.
                </p>
              </div>
              <NewsletterForm className="w-full max-w-md" onSubmit={() => undefined} />
            </Stack>
          </Container>
        </Section>

        <ContactForm id="contact" onSubmit={() => undefined} />

        <CTASection
          title="Ready to build?"
          description="Get started with the RTDS design system and ship beautiful landing pages faster."
          tone="muted"
          actions={
            <>
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </>
          }
        />
      </main>

      <SiteFooter
        logo={<Logo />}
        description="A modern design system for building beautiful, accessible landing pages."
        columns={footerColumns}
        socialLinks={[
          {
            label: 'GitHub',
            href: '#github',
            icon: <Icon icon={Github} />,
          },
          {
            label: 'Twitter',
            href: '#twitter',
            icon: <Icon icon={Twitter} />,
          },
        ]}
        copyright="© 2026 RTDS. All rights reserved."
        legalLinks={[
          { label: 'Privacy', href: '#privacy' },
          { label: 'Terms', href: '#terms' },
        ]}
      />
    </SiteShell>
  );
}

export function App() {
  return (
    <BrandProvider defaultBrand="atlas">
      <ThemeProvider defaultMode="system">
        <Landing />
      </ThemeProvider>
    </BrandProvider>
  );
}
