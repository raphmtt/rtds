import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextLink,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rtds/ui';

const meta: Meta = {
  title: 'Foundations/Primitives',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AccordionExample: Story = {
  name: 'Accordion',
  render: () => (
    <Accordion className="w-80">
      <AccordionItem value="a">
        <AccordionTrigger>First item</AccordionTrigger>
        <AccordionContent>Panel content for the first item.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>Panel content for the second item.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DialogExample: Story = {
  name: 'Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>This dialog wraps Base UI Popup + Backdrop.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" type="button" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SheetExample: Story = {
  name: 'Sheet',
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet</SheetTitle>
          <SheetDescription>Drawer from the right edge.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const TabsExample: Story = {
  name: 'Tabs',
  render: () => (
    <Tabs defaultValue="one" className="w-80">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
    </Tabs>
  ),
};

export const CheckboxSwitchTooltip: Story = {
  name: 'Checkbox, Switch, Tooltip',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="story-check" defaultChecked />
        <Label htmlFor="story-check">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="story-switch" />
        <Label htmlFor="story-switch">Off</Label>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" />}>Hover</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ),
};

export const AvatarSeparatorLink: Story = {
  name: 'Avatar, Separator, TextLink',
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage alt="Ada" src="https://i.pravatar.cc/80?img=5" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <TextLink href="#docs">Documentation</TextLink>
      </div>
      <Separator />
    </div>
  ),
};
