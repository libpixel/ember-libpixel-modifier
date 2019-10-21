import Modifier from "ember-class-based-modifier";
import { inject as service } from "@ember/service";

export default class LibpixelifyModifier extends Modifier {
  @service libpixel;

  options = {};

  didReceiveArguments() {
    this.parseOptions();
    this.evaluateSrcSet();
    this.element.setAttribute("src", this.libpixelUrl);
  }

  get libpixelUrl() {
    return this.libpixel.url(this.elementSrc, this.options);
  }

  get elementSrc() {
    return this.element.getAttribute("src");
  }

  evaluateSrcSet() {
    if (this.args.named.srcset) {
      let srcset = [];
      this.args.named.srcset.forEach(element => {
        let decl = "";
        decl += this.libpixel.url(this.elementSrc, {
          width: element.slice(0, -1)
        });
        decl += " " + element;
        srcset.push(decl);
      });
      this.element.setAttribute("srcset", srcset.join(", "));

      if (this.args.named.sizes) {
        this.element.setAttribute("sizes", this.args.named.sizes.join(", "));
      }
    }
  }

  determineWidth(width) {
    if (this.args.named.constrain) {
      return this.element.parentElement.getBoundingClientRect().width;
    } else if (this.element.getAttribute("width")) {
      return this.element.getAttribute("width");
    } else {
      return width;
    }
  }

  determineHeight(height) {
    if (this.element.getAttribute("height")) {
      return this.element.getAttribute("height");
    } else {
      return height;
    }
  }

  parseTransformations() {
    const transformations = this.args.named.transformations;
    if (transformations) {
      const {
        blur,
        brightness,
        contrast,
        hue,
        saturation,
        gamma,
        quality,
        format
      } = transformations;

      let options = {
        blur: blur,
        brightness: brightness,
        contrast: contrast,
        hue: hue,
        saturation: saturation,
        gamma: gamma,
        quality: quality,
        format: format
      };

      return options;
    } else {
      return {};
    }
  }

  parseOptions() {
    const {
      source,
      mode,
      crop,
      dpr,
      width,
      height,
      upscale,
      debug
    } = this.args.named;

    const transformations = this.parseTransformations();

    let options = {
      source: source,
      mode: mode,
      crop: crop,
      dpr: dpr,
      upscale: upscale,
      debug: debug,
      width: this.determineWidth(width),
      height: this.determineHeight(height),
      ...transformations
    };

    Object.keys(options).forEach(
      key => options[key] === undefined && delete options[key]
    );

    this.options = options;
  }
}
