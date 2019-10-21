ember-libpixel-modifier
==============================================================================

An element modifier for enabling LibPixel image processing and delivery on the
images of your Ember app.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

Before you can use this modifier, you need to install and configure
[ember-libpixel](https://github.com/libpixel/ember-libpixel) add-on. It will
provide an Ember service that this add-on uses to generate and sign LibPixel
URLs for your images.

To install the element modifier, run

```bash
ember install ember-libpixel-modifier
```

After you have configured the LibPixel service for your Ember app, you can
start using the element modifier on your image elements.


Usage
------------------------------------------------------------------------------

Modifiers are Ember's new tool for working with the DOM. They are similar to
Handlebars helpers, they are functions or classes that can be used in
templates directly using `{{double-curlies}}`. Modifiers are applied directly
to elements.

You can read more about modifiers in Chris Garrett's
[blog post about modifiers](https://blog.emberjs.com/2019/03/06/coming-soon-in-ember-octane-part-4.html) at Ember blog.

This add-on gives you an element modifier `{{libpixelify}}` which you will
use on those `img` elements that you want to have the image be served from
LibPixel image processing and delivery infrastructure.

```handlebars
<img {{libpixelify}} src="hello.jpg" alt="Hello">
```

The modifier will rewrite the `src` attribute with an appropriate LibPixel
URL so that the browser will load the image file from LibPixel CDN and not
from your image source of originals.

The above is the simplest use case of the modifier and LibPixel image
processing infrastructure, where you don't actually do any processing on
the image but simply use LibPixel's lightning quick CDN for image delivery.

The [Element Modifier API](#element-modifier-api) section describes the
whole modifier API that you can use to add some extra processing and goodies
to the images.


Element Modifier API
------------------------------------------------------------------------------

`libpixelify` modifier accepts a series of named arguments. All named arguments
are optional.

* `width`: (integer, defaults to 0) explicitly sets the width of the image
* `height`: (integer, defaults to 0) explicitly sets the height of the image
* `mode`: (string, defaults to "fit") image processing mode, see available modes
  in LibPixel documentation
* `crop`: (string) allows you to specify which part of the image is used, eg. "100,100,500,500"
* `dpr`: (float, between 0.1 and 10.0) device pixel ratio
* `upscale`: (boolean, defaults to true) allow upscaling when resizing image
* `debug`: (boolean, defaults to false) for debugging errors in LibPixel API calls
* `constrain`: (boolean, defaults to false) constrain the image size to the size of the parent element
* `source`: (string) a specific LibPixel Image Source different from the default one
* `transformations`: (hash) a hash of transformations you wish to perform on the image

The following would eventually produce a 256x256 image from the given source
image, (possibly) resizing to fill the entire area, maintaining aspect ratio,
but possibly clipping a part of the image.

```handlebars
<img
  {{libpixelify
    width=256
    height=256
    mode="crop"
  }}
  src="avatar.jpg"
  alt="Large avatar"
>
```

Supported transformations are all "transformational" LibPixel Image API
operations, documented at [LibPixel API documentation](https://libpixel.com/docs/).

* `blur`: (integer, between 0 and 100) blurs the image
* `brightness`: (integer, between -100 and 100) adjusting image brightness
* `contrast`: (integer, between -100 and 100) adjusting image contrast
* `hue`: (integer, between -100 and 100) adjusting the hue value of the image
* `gamma`: (integer, between -100 and 100) adjusting the gamma value of the image
* `saturation`: (integer, between -100 and 100) adjusting the saturation of the image
* `quality`: (integer, between 0 and 100) adjusting the image quality (JPEG only)
* `format`: (string) transforming to a new image format (JPEG, PNG, WebP supported)

Transformations are applied to the image by giving a hash like the following:

```handlebars
<img
  {{libpixelify
    transformations=(hash
      blur=20
      saturation=-50
      quality=70
    )
  }}
  src="hello.jpg">
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
