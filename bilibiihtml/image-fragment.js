// image-fragment.js

class ImageFragmentPainter {
  static get inputProperties() {
    return ["--fragment-count", "--fragment-size"];
  }

  paint(ctx, geom, properties) {
    const fragmentCount =
      parseInt(properties.get("--fragment-count").toString()) || 10;
    const fragmentSize =
      parseFloat(properties.get("--fragment-size").toString()) || 20;

    const img = document.createElement("img");
    img.src = "./touxiang.jpg";

    img.onload = function () {
      ctx.drawImage(img, 0, 0, geom.width, geom.height);

      for (let i = 0; i < fragmentCount; i++) {
        const x = Math.random() * geom.width;
        const y = Math.random() * geom.height;
        const w = Math.random() * fragmentSize;
        const h = Math.random() * fragmentSize;

        ctx.clearRect(x, y, w, h);
      }
    };
  }
}

registerPaint("image-fragment", ImageFragmentPainter);
