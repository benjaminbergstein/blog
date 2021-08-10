---
title: "A basic React <Input> component with TypeScript"
date: "2021-03-20T00:12:03.284Z"
description: ""
category: engineering
status: draft
---

Almost any application with a user interface requires a control for user input.
For HTML applications, &lt;input&gt; is the most generic input control, alongside
other controls such as &lt;select&gt; and &lt;textarea&gt;.

Many libraries have sought to make writing forms and inputs more easily. Rails,
for example sought to provide [easy-to-use form builder](https://guides.rubyonrails.org/form_helpers.html) utilities, and the
[simple_form gem](https://github.com/heartcombo/simple_form) sought to make
forms easy, though imho they only made them more complex.

Can it be done? Is it possible to arrive at a useful and reusable form
primitive for react? Let's find out.

## Steps

```toc
exclude: Steps
fromHeading: 1
toHeading: 2
```

# Step 1: The bare minimum

The first step is to wrap the input tag in a component. We definitely want to
forward a ref so that whatever component uses `<Input>` can pass along and
access the underlying `HTMLInputElement`.

```typescript
import React, { InputHTMLAttributes } from 'react'

const Input = React.forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <input ref={ref} {...props} />
})

export default Input
```

[CodeSandbox](https://codesandbox.io/s/exciting-wilson-sv79e?file=/src/App.tsx)

# Step 2: Reset styles

Personally, I find styling input tags directly an exercise in futility. Instead,
let's clear out the styles and decorate the input by wrapping it. So first, we
need to reset all of the input's styles

```typescript
import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { border, layout, background, backgroundColor, boxShadow, BoxShadowProps, LayoutProps, BorderProps, BackgroundProps, BackgroundColorProps } from "styled-system";

type InputFaceProps = BorderProps & BackgroundColorProps & BoxShadowProps & LayoutProps & BackgroundProps;

const InputFace = styled.input<InputFaceProps>(border, background, backgroundColor, boxShadow, layout);

InputFace.defaultProps = {
  height: "100%",
  width: "100%",
  borderWidth: 0,
  backgroundImage: "none",
  backgroundColor: "transparent",
  boxShadow: "none"
};

interface Props extends InputHTMLAttributes<HTMLInputElement> { 
  as?: string | React.ComponentType<any>
}
const Input = React.forwardRef<
  HTMLInputElement,
  Props
>(({ as = "input", ...props }, ref) => {
  return <InputFace as={as} ref={ref} {...props} />;
});

export default Input;
```

The idea here is to have a "blank" input that fills up the space of its parent.

The `as` prop allows the parent to turn our input into a `<textarea>`.

[CodeSandbox](https://codesandbox.io/s/tender-water-enpok?file=/src/App.tsx)

# Step 2: Write a wrapper

The above input element is very flexible, but not very usable. Without a wrapper,
it's pretty much transparent on the page.

