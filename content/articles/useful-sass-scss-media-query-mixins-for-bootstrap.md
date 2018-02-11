---
title: Useful Sass (SCSS) media query mixins for Bootstrap
date: '2018-02-11T15:31:24+11:00'
featured: /img/uploads/featured-image-sass-media-query-mixins.jpg
categories:
  - development
featured_opacity: '.5'
dark_bg: true
toc: true
---
{{< lead >}}Today I'm going to share some Sass (SCSS) mixins which I've found helpful when developing Bootstrap websites.{{< /lead >}}

Whether you're using full-blown bootstrap or just leveraging the familiar grid these will save you time with repetitive media queries. Due to the similarities in naming conventions these mixins will work in both Bootstrap v3 and the newly released v4. In these examples I'll be using v4 breakpoints.

## What do the mixins do?

* Respond above XX.
* Respond below XX.
* Respond between XX and XX.

## What problems do the mixins solve?

While developing bootstrap sites there are a couple of things I find myself writing over and over again:

{{< highlight css >}}
@media (min-width: 768px) {
  // Target devices wider than 768px.
}

@media (max-width: 767px) {
  // Target devices narrower than 768px.
}
{{< /highlight >}}

In Bootstrap terms, the breakpoint above 768 pixels is <code>sm</code>.

In additional to these two, I occasionally need to apply CSS between two breakpoints.

{{< highlight css >}}
@media (min-width: 768px) and (max-width: 991px) {
  // Target devices between 768px and 992px.
}
{{< /highlight >}}

## Breakpoint variables

It's best practice to use Bootstrap's breakpoints but it's painful to write them all the time. To get around that I create a map of variables:

{{< highlight scss >}}
// A map of breakpoints.
$breakpoints: (
  xs: 576px,
  sm: 768px,
  md: 992px,
  lg: 1200px
);
{{< /highlight >}}

In my own fork of the bootstrap v4 grid I've added an additional xl breakpoint at 1500px which I find useful for large monitors.

## Media query mixins

The media queries are show in detail below but first, here's how to use each one:

{{< highlight scss >}}
@include respond-above(sm) {
  // CSS declarations.
}

@include respond-below(sm) {
  // CSS declarations.
}

@include respond-between(sm, md) {
  // CSS declarations.
}
{{< /highlight >}}

### Respond above

{{< highlight scss >}}
// Respond above.
@mixin respond-above($breakpoint) {

  // If the breakpoint exists in the map.
  @if map-has-key($breakpoints, $breakpoint) {

    // Get the breakpoint value.
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    // Write the media query.
    @media (min-width: $breakpoint-value) {
      @content;
    }
  }
}
{{< /highlight >}}

### Respond below

{{< highlight scss >}}
@mixin respond-below($breakpoint) {

  // If the breakpoint exists in the map.
  @if map-has-key($breakpoints, $breakpoint) {

    // Get the breakpoint value.
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    // Write the media query.
    @media (max-width: ($breakpoint-value - 1)) {
      @content;
    }
  }
}
{{< /highlight >}}

### Respond between

{{< highlight scss >}}
@mixin respond-between($lower, $upper) {

  // If both the lower and upper breakpoints exist in the map.
  @if map-has-key($breakpoints, $lower) and map-has-key($breakpoints, $upper) {

    // Get the lower and upper breakpoints.
    $lower-breakpoint: map-get($breakpoints, $lower);
    $upper-breakpoint: map-get($breakpoints, $upper);

    // Write the media query.
    @media (min-width: $lower-breakpoint) and (max-width: ($upper-breakpoint - 1)) {
      @content;
    }
  }
}
{{< /highlight >}}

I don't bother coding in smarts to ensure that the first parameter is lower than the second one but I've never had any troubles with this.

## What next?

I found these mixins super handy in my day-to-day work but they were still somewhat laborious to write. So I recently wrote some custom Sublime Text snippets which autocomplete based on a keyword combination.

### Bonus for Sublime Text users.

Snippets are very easy to add although [the syntax](http://sublimetext.info/docs/en/extensibility/snippets.html) can be a little daunting at first. They can be added via <code>Tools » Developer » New Snippet</code>. I've written a series of Snippets which [you can find on GitHub](https://github.com/lenymo/sublime-text-snippets) and you are more than welcome to copy them.

I wrote individual snippets for each breakpoint and they are listed below.

Respond above:
* <code>raxs</code>
* <code>rasm</code>
* <code>ramd</code>
* <code>ralg</code>

Respond below:
* <code>rbxs</code>
* <code>rbsm</code>
* <code>rbmd</code>
* <code>rblg</code>

Respond between:
* <code>rbtw</code>

There's only one "respond between" snippet which takes in a lower and upper parameter once you type <code>rbtw</code> press tab. Press tab again to cycle between values and again to start writing SCSS.

### Adding the snippets

I'm not sure exactly where snippets live on a Windows machine but on Mac they're here:

<code>/Users/yourusername/Library/Application Support/Sublime Text 3/Packages</code>.

Note that the Library directory is a hidden file so you'll need to show hidden files. If you're macOS Sierra or newer you can show hidden files via <code>CMD + SHIFT + .</code> otherwise you will need to load up terminal [follow the instructions here](https://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/).