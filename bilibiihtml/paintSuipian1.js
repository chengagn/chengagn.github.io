// paintSuipian.js
registerPaint(
  "suipian",
  class {
    static get inputProperties() {
      return ["--color", "--m", "--n", "--f"];
    }
    paint(ctx, size, properties) {
      console.log("ctx:", ctx, "size:", size, properties.get("--color"));
      const m = properties.get("--m");
      const n = properties.get("--n");
      const f = properties.get("--f");
      const w = size.width / m;
      const h = size.height / n;
      const l = 10;

      const mask = 0xffffffff;
      const seed = 3;
      let m_w = (123456789 + seed) & mask;
      let m_z = (987654321 - seed) & mask;
      // 随机算法
      const random = function () {
        m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;
        let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
      };

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          ctx.fillStyle =
            "rgba(0,0,0," + (random() * (l - 1) + 1 - (1 - f) * l) + ")";
          ctx.fillRect(i * w - 1, j * h - 1, w + 1, h + 1);
        }
      }
    }
  },
);
