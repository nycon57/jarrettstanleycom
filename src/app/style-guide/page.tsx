"use client";

import { useState } from "react";
import { 
  Check, 
  Copy, 
  Mail, 
  Phone, 
  ArrowRight, 
  Search,
  Star,
  Heart,
  Download,
  Upload,
  Settings,
  User,
  Home,
  Menu,
  X,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Heading, 
  Text, 
  Label, 
  Caption, 
  Code, 
  Blockquote 
} from "@/components/ui/typography";
import { 
  Spinner, 
  ProgressBar, 
  Dots, 
  Pulse 
} from "@/components/ui/loading";
import { animations } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function StyleGuidePage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(60);

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const colors = [
    { name: "Shadow", hex: "#131321", rgb: "19, 19, 33", class: "bg-shadow" },
    { name: "Indigo", hex: "#2C2A4A", rgb: "44, 42, 74", class: "bg-indigo" },
    { name: "Orchid", hex: "#4F518C", rgb: "79, 81, 140", class: "bg-orchid" },
    { name: "Lilac", hex: "#907AD6", rgb: "144, 122, 214", class: "bg-lilac" },
    { name: "Lavender", hex: "#DABFFF", rgb: "218, 191, 255", class: "bg-lavender" },
    { name: "Skyward", hex: "#7FDEFF", rgb: "127, 222, 255", class: "bg-skyward" },
  ];

  const spacingScale = [
    { name: "0", value: "0px", class: "w-0" },
    { name: "1", value: "0.25rem", class: "w-1" },
    { name: "2", value: "0.5rem", class: "w-2" },
    { name: "3", value: "0.75rem", class: "w-3" },
    { name: "4", value: "1rem", class: "w-4" },
    { name: "6", value: "1.5rem", class: "w-6" },
    { name: "8", value: "2rem", class: "w-8" },
    { name: "12", value: "3rem", class: "w-12" },
    { name: "16", value: "4rem", class: "w-16" },
    { name: "20", value: "5rem", class: "w-20" },
    { name: "24", value: "6rem", class: "w-24" },
    { name: "32", value: "8rem", class: "w-32" },
  ];

  return (
    <div className="min-h-screen bg-background py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <Heading variant="h1" color="gradient" className="mb-4">
            Component Style Guide
          </Heading>
          <Text variant="large" color="muted">
            Comprehensive design system for JarrettStanley.com
          </Text>
        </div>

        {/* Table of Contents */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Color Palette",
                "Typography",
                "Buttons",
                "Badges",
                "Cards",
                "Alerts",
                "Form Elements",
                "Loading States",
                "Animations",
                "Spacing",
                "Icons",
                "Layout",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-muted-foreground hover:text-lilac transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Palette Section */}
        <section id="color-palette" className="mb-16">
          <Heading variant="h2" className="mb-8">Color Palette</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => (
              <Card key={color.name} variant="elevated">
                <CardContent className="p-6">
                  <div className={cn("h-24 rounded-lg mb-4", color.class)} />
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Text weight="semibold">{color.name}</Text>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                      >
                        {copiedItem === color.name ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Caption>HEX: {color.hex}</Caption>
                    <Caption>RGB: {color.rgb}</Caption>
                    <Code>className="{color.class}"</Code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gradient Examples */}
          <div className="mt-8">
            <Heading variant="h3" className="mb-4">Gradients</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="h-24 rounded-lg bg-gradient-to-r from-lilac to-orchid mb-4" />
                  <Code>from-lilac to-orchid</Code>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="h-24 rounded-lg bg-gradient-to-r from-orchid to-skyward mb-4" />
                  <Code>from-orchid to-skyward</Code>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="h-24 rounded-lg bg-gradient-to-r from-lilac via-orchid to-skyward mb-4" />
                  <Code>from-lilac via-orchid to-skyward</Code>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="h-24 rounded-lg bg-gradient-to-br from-lavender to-lilac mb-4" />
                  <Code>from-lavender to-lilac</Code>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <Heading variant="h2" className="mb-8">Typography</Heading>
          
          <div className="space-y-8">
            {/* Headings */}
            <Card>
              <CardHeader>
                <CardTitle>Headings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Heading variant="h1">Heading 1 - Signal Font</Heading>
                  <Code>{"<Heading variant='h1'>...</Heading>"}</Code>
                </div>
                <Separator />
                <div>
                  <Heading variant="h2">Heading 2 - Signal Font</Heading>
                  <Code>{"<Heading variant='h2'>...</Heading>"}</Code>
                </div>
                <Separator />
                <div>
                  <Heading variant="h3">Heading 3 - Signal Font</Heading>
                  <Code>{"<Heading variant='h3'>...</Heading>"}</Code>
                </div>
                <Separator />
                <div>
                  <Heading variant="h4">Heading 4 - Signal Font</Heading>
                  <Code>{"<Heading variant='h4'>...</Heading>"}</Code>
                </div>
                <Separator />
                <div>
                  <Heading variant="h5">Heading 5 - Signal Font</Heading>
                  <Code>{"<Heading variant='h5'>...</Heading>"}</Code>
                </div>
                <Separator />
                <div>
                  <Heading variant="h6">Heading 6 - Signal Font</Heading>
                  <Code>{"<Heading variant='h6'>...</Heading>"}</Code>
                </div>
              </CardContent>
            </Card>

            {/* Text Styles */}
            <Card>
              <CardHeader>
                <CardTitle>Text Styles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Text variant="large">Large text - Hind Font</Text>
                  <Code>{"<Text variant='large'>...</Text>"}</Code>
                </div>
                <Separator />
                <div>
                  <Text variant="base">Base text - Hind Font (default)</Text>
                  <Code>{"<Text variant='base'>...</Text>"}</Code>
                </div>
                <Separator />
                <div>
                  <Text variant="small">Small text - Hind Font</Text>
                  <Code>{"<Text variant='small'>...</Text>"}</Code>
                </div>
                <Separator />
                <div>
                  <Text variant="xs">Extra small text - Hind Font</Text>
                  <Code>{"<Text variant='xs'>...</Text>"}</Code>
                </div>
              </CardContent>
            </Card>

            {/* Text Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Text Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Text color="default">Default text color</Text>
                <Text color="muted">Muted text color</Text>
                <Text color="lilac">Lilac text color</Text>
                <Text color="orchid">Orchid text color</Text>
                <Text color="skyward">Skyward text color</Text>
                <Text color="gradient" weight="semibold">Gradient text color</Text>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="mb-16">
          <Heading variant="h2" className="mb-8">Buttons</Heading>
          
          <div className="space-y-8">
            {/* Button Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-4">
                  <Button variant="gradient">Gradient Primary</Button>
                  <Button variant="gradient-secondary">Gradient Secondary</Button>
                  <Button variant="gradient-subtle">Gradient Subtle</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-4">
                  <Button variant="lilac">Lilac</Button>
                  <Button variant="orchid">Orchid</Button>
                  <Button variant="skyward">Skyward</Button>
                </div>
              </CardContent>
            </Card>

            {/* Button Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm" variant="gradient">Small</Button>
                  <Button size="default" variant="gradient">Default</Button>
                  <Button size="lg" variant="gradient">Large</Button>
                  <Button size="xl" variant="gradient">Extra Large</Button>
                </div>
              </CardContent>
            </Card>

            {/* Button States */}
            <Card>
              <CardHeader>
                <CardTitle>Button States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="gradient">Normal</Button>
                  <Button variant="gradient" disabled>Disabled</Button>
                  <Button variant="gradient">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Button with Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons with Icons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="gradient">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="gradient">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="gradient">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="gradient">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section id="badges" className="mb-16">
          <Heading variant="h2" className="mb-8">Badges</Heading>
          
          <div className="space-y-8">
            {/* Badge Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-3">
                  <Badge variant="lilac">Lilac</Badge>
                  <Badge variant="orchid">Orchid</Badge>
                  <Badge variant="skyward">Skyward</Badge>
                  <Badge variant="lavender">Lavender</Badge>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-3">
                  <Badge variant="gradient">Gradient</Badge>
                  <Badge variant="gradient-subtle">Gradient Subtle</Badge>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Badge Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Badge Sizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="sm" variant="lilac">Small</Badge>
                  <Badge size="md" variant="lilac">Medium</Badge>
                  <Badge size="lg" variant="lilac">Large</Badge>
                  <Badge size="xl" variant="lilac">Extra Large</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section id="cards" className="mb-16">
          <Heading variant="h2" className="mb-8">Cards</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This is a default card variant.</Text>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Enhanced shadow on hover</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This card has elevation.</Text>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Scales on hover</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This card is interactive.</Text>
              </CardContent>
            </Card>

            <Card variant="gradient-border">
              <CardHeader>
                <CardTitle>Gradient Border</CardTitle>
                <CardDescription>Card with gradient border</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This card has a gradient border.</Text>
              </CardContent>
            </Card>

            <Card variant="ghost">
              <CardHeader>
                <CardTitle>Ghost Card</CardTitle>
                <CardDescription>No border or shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This is a ghost card.</Text>
              </CardContent>
            </Card>

            <Card variant="blur">
              <CardHeader>
                <CardTitle>Blur Card</CardTitle>
                <CardDescription>Glassmorphism effect</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This card has a blur effect.</Text>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alerts Section */}
        <section id="alerts" className="mb-16">
          <Heading variant="h2" className="mb-8">Alerts</Heading>
          
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with standard styling.
              </AlertDescription>
            </Alert>

            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertTitle>Info Alert</AlertTitle>
              <AlertDescription>
                This alert provides informational content using skyward color.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success Alert</AlertTitle>
              <AlertDescription>
                Operation completed successfully with lavender accent.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning Alert</AlertTitle>
              <AlertDescription>
                Please review this warning message with lilac accent.
              </AlertDescription>
            </Alert>

            <Alert variant="error">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                An error occurred. Please try again with orchid accent.
              </AlertDescription>
            </Alert>

            <Alert variant="gradient-info">
              <Info className="h-4 w-4" />
              <AlertTitle>Gradient Info Alert</AlertTitle>
              <AlertDescription>
                This alert has a gradient background.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Form Elements Section */}
        <section id="form-elements" className="mb-16">
          <Heading variant="h2" className="mb-8">Form Elements</Heading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Input Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="text">Text Input</Label>
                  <Input id="text" type="text" placeholder="Enter text..." />
                </div>
                <div>
                  <Label htmlFor="email" required>Email Input</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="disabled">Disabled Input</Label>
                  <Input id="disabled" disabled placeholder="Disabled..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="select">Choose Option</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Checkboxes & Radio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check1" />
                    <Label htmlFor="check1">Checkbox option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check2" />
                    <Label htmlFor="check2">Checkbox option 2</Label>
                  </div>
                </div>
                <Separator />
                <RadioGroup defaultValue="radio1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="radio1" id="radio1" />
                    <Label htmlFor="radio1">Radio option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="radio2" id="radio2" />
                    <Label htmlFor="radio2">Radio option 2</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Loading States Section */}
        <section id="loading-states" className="mb-16">
          <Heading variant="h2" className="mb-8">Loading States</Heading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Spinners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Spinner size="sm" color="lilac" />
                  <Spinner size="md" color="orchid" />
                  <Spinner size="lg" color="skyward" />
                  <Spinner size="xl" color="gradient" />
                </div>
                <Separator />
                <Spinner label="Loading content..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Bars</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar value={30} color="lilac" showLabel />
                <ProgressBar value={60} color="orchid" showLabel />
                <ProgressBar value={90} color="skyward" showLabel />
                <ProgressBar value={75} color="gradient" showLabel />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton Loaders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton variant="shimmer" className="h-20 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Loading States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Dots size="sm" color="lilac" />
                  <Dots size="md" color="orchid" />
                  <Dots size="lg" color="skyward" />
                </div>
                <Separator />
                <div className="flex items-center gap-6">
                  <Pulse size="sm" color="lilac" />
                  <Pulse size="md" color="orchid" />
                  <Pulse size="lg" color="skyward" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Animations Section */}
        <section id="animations" className="mb-16">
          <Heading variant="h2" className="mb-8">Animations</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hover Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className={animations.micro.button}
                  >
                    Scale on Hover
                  </Button>
                  <Card
                    variant="default"
                    className={animations.micro.card}
                  >
                    <CardContent className="p-4">
                      <Text>Lift & Glow Card</Text>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transitions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={cn(
                      "p-4 bg-lilac/10 rounded-lg cursor-pointer",
                      animations.createTransition("all", "slow")
                    )}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgb(144 122 214 / 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    <Text>Slow Color Transition</Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pulse Animation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-lilac rounded-full animate-ping opacity-75" />
                    <div className="relative w-16 h-16 bg-lilac rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="mb-16">
          <Heading variant="h2" className="mb-8">Spacing Scale</Heading>
          
          <Card>
            <CardHeader>
              <CardTitle>Spacing Tokens</CardTitle>
              <CardDescription>
                Consistent spacing scale used throughout the design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {spacingScale.map((space) => (
                  <div key={space.name} className="flex items-center gap-4">
                    <Code className="w-12">{space.name}</Code>
                    <div className={cn("h-8 bg-gradient-to-r from-lilac to-orchid", space.class)} />
                    <Caption>{space.value}</Caption>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icons Section */}
        <section id="icons" className="mb-16">
          <Heading variant="h2" className="mb-8">Icons</Heading>
          
          <Card>
            <CardHeader>
              <CardTitle>Icon Library</CardTitle>
              <CardDescription>
                Using Lucide React icons throughout the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                {[
                  Home, User, Settings, Mail, Phone, Search,
                  ArrowRight, Check, X, Menu, Download, Upload,
                  Star, Heart, AlertCircle, CheckCircle, Info, XCircle,
                ].map((Icon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-3 bg-muted rounded-lg hover:bg-lilac/10 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Layout Section */}
        <section id="layout" className="mb-16">
          <Heading variant="h2" className="mb-8">Layout</Heading>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Container Widths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-lilac/10 p-4 rounded-lg">
                    <Code>container</Code>
                    <Caption>Max width: 1400px (2xl screens)</Caption>
                  </div>
                  <div className="bg-orchid/10 p-4 rounded-lg max-w-7xl">
                    <Code>max-w-7xl</Code>
                    <Caption>Max width: 80rem (1280px)</Caption>
                  </div>
                  <div className="bg-skyward/10 p-4 rounded-lg max-w-5xl">
                    <Code>max-w-5xl</Code>
                    <Caption>Max width: 64rem (1024px)</Caption>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grid System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-gradient-to-br from-lilac/20 to-orchid/20 rounded flex items-center justify-center text-xs font-medium"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Code Examples */}
        <section id="code-examples" className="mb-16">
          <Heading variant="h2" className="mb-8">Code Examples</Heading>
          
          <Tabs defaultValue="button" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="button">Button</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="loading">Loading</TabsTrigger>
            </TabsList>
            
            <TabsContent value="button">
              <Card>
                <CardHeader>
                  <CardTitle>Button Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <Code variant="block">
{`import { Button } from "@/components/ui/button"

// Basic button
<Button variant="gradient">Click me</Button>

// With icon
<Button variant="gradient">
  <Mail className="mr-2 h-4 w-4" />
  Send Email
</Button>

// Different sizes
<Button size="sm" variant="lilac">Small</Button>
<Button size="lg" variant="orchid">Large</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>`}
                  </Code>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="card">
              <Card>
                <CardHeader>
                  <CardTitle>Card Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <Code variant="block">
{`import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive card
<Card variant="interactive">
  <CardContent>Interactive content</CardContent>
</Card>

// Gradient border card
<Card variant="gradient-border">
  <CardContent>Gradient border content</CardContent>
</Card>`}
                  </Code>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>Form Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <Code variant="block">
{`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/typography"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Input field
<div>
  <Label htmlFor="email" required>Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="email@example.com" 
  />
</div>

// Select dropdown
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>`}
                  </Code>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="loading">
              <Card>
                <CardHeader>
                  <CardTitle>Loading States Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <Code variant="block">
{`import { Spinner, ProgressBar, Skeleton, Dots } from "@/components/ui/loading"

// Spinner
<Spinner size="md" color="lilac" />
<Spinner label="Loading..." />

// Progress bar
<ProgressBar value={60} max={100} color="gradient" showLabel />

// Skeleton loader
<Skeleton className="h-4 w-full" />
<Skeleton variant="shimmer" className="h-20 w-full" />

// Dots loading
<Dots size="md" color="orchid" />`}
                  </Code>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-16">
          <Heading variant="h2" className="mb-8">Best Practices</Heading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Do's
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <Text variant="small">Use brand colors consistently</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <Text variant="small">Maintain proper contrast ratios</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <Text variant="small">Use semantic component variants</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <Text variant="small">Follow the spacing scale</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    <Text variant="small">Test in both light and dark modes</Text>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Don'ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5" />
                    <Text variant="small">Mix different button styles randomly</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5" />
                    <Text variant="small">Use inline styles for colors</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5" />
                    <Text variant="small">Create custom spacing values</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5" />
                    <Text variant="small">Override component animations</Text>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5" />
                    <Text variant="small">Ignore accessibility guidelines</Text>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}