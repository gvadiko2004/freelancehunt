!(function (e, t) {
  "function" == typeof define && define.amd
    ? define([], function () {
        return t(e);
      })
    : "object" == typeof exports
    ? (module.exports = t(e))
    : (e.SmoothScroll = t(e));
})(
  "undefined" != typeof global
    ? global
    : "undefined" != typeof window
    ? window
    : this,
  function (w) {
    "use strict";
    var L = {
        ignore: "[data-scroll-ignore]",
        header: null,
        topOnEmptyHash: !0,
        speed: 500,
        speedAsDuration: !1,
        durationMax: null,
        durationMin: null,
        clip: !0,
        offset: 0,
        easing: "easeInOutCubic",
        customEasing: null,
        updateURL: !0,
        popstate: !0,
        emitEvents: !0,
      },
      H = function () {
        var n = {};
        return (
          Array.prototype.forEach.call(arguments, function (e) {
            for (var t in e) {
              if (!e.hasOwnProperty(t)) return;
              n[t] = e[t];
            }
          }),
          n
        );
      },
      r = function (e) {
        "#" === e.charAt(0) && (e = e.substr(1));
        for (
          var t,
            n = String(e),
            o = n.length,
            a = -1,
            r = "",
            i = n.charCodeAt(0);
          ++a < o;

        ) {
          if (0 === (t = n.charCodeAt(a)))
            throw new InvalidCharacterError(
              "Invalid character: the input contains U+0000."
            );
          (1 <= t && t <= 31) ||
          127 == t ||
          (0 === a && 48 <= t && t <= 57) ||
          (1 === a && 48 <= t && t <= 57 && 45 === i)
            ? (r += "\\" + t.toString(16) + " ")
            : (r +=
                128 <= t ||
                45 === t ||
                95 === t ||
                (48 <= t && t <= 57) ||
                (65 <= t && t <= 90) ||
                (97 <= t && t <= 122)
                  ? n.charAt(a)
                  : "\\" + n.charAt(a));
        }
        return "#" + r;
      },
      q = function () {
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      },
      x = function (e) {
        return e
          ? ((t = e), parseInt(w.getComputedStyle(t).height, 10) + e.offsetTop)
          : 0;
        var t;
      },
      Q = function (e, t, n, o) {
        if (t.emitEvents && "function" == typeof w.CustomEvent) {
          var a = new CustomEvent(e, {
            bubbles: !0,
            detail: { anchor: n, toggle: o },
          });
          document.dispatchEvent(a);
        }
      };
    return function (o, e) {
      var I,
        a,
        M,
        A,
        C = {};
      (C.cancelScroll = function (e) {
        cancelAnimationFrame(A), (A = null), e || Q("scrollCancel", I);
      }),
        (C.animateScroll = function (i, s, e) {
          C.cancelScroll();
          var c = H(I || L, e || {}),
            u = "[object Number]" === Object.prototype.toString.call(i),
            t = u || !i.tagName ? null : i;
          if (u || t) {
            var l = w.pageYOffset;
            c.header && !M && (M = document.querySelector(c.header));
            var n,
              o,
              a,
              d,
              r,
              f,
              m,
              h,
              p = x(M),
              g = u
                ? i
                : (function (e, t, n, o) {
                    var a = 0;
                    if (e.offsetParent)
                      for (; (a += e.offsetTop), (e = e.offsetParent); );
                    return (
                      (a = Math.max(a - t - n, 0)),
                      o && (a = Math.min(a, q() - w.innerHeight)),
                      a
                    );
                  })(
                    t,
                    p,
                    parseInt(
                      "function" == typeof c.offset ? c.offset(i, s) : c.offset,
                      10
                    ),
                    c.clip
                  ),
              y = g - l,
              v = q(),
              S = 0,
              E =
                ((n = y),
                (a = (o = c).speedAsDuration
                  ? o.speed
                  : Math.abs((n / 1e3) * o.speed)),
                o.durationMax && a > o.durationMax
                  ? o.durationMax
                  : o.durationMin && a < o.durationMin
                  ? o.durationMin
                  : parseInt(a, 10)),
              b = function (e, t) {
                var n,
                  o,
                  a,
                  r = w.pageYOffset;
                if (e == t || r == t || (l < t && w.innerHeight + r) >= v)
                  return (
                    C.cancelScroll(!0),
                    (o = t),
                    (a = u),
                    0 === (n = i) && document.body.focus(),
                    a ||
                      (n.focus(),
                      document.activeElement !== n &&
                        (n.setAttribute("tabindex", "-1"),
                        n.focus(),
                        (n.style.outline = "none")),
                      w.scrollTo(0, o)),
                    Q("scrollStop", c, i, s),
                    !(A = d = null)
                  );
              },
              O = function (e) {
                var t, n, o;
                d || (d = e),
                  (S += e - d),
                  (f =
                    l +
                    y *
                      ((n = r = 1 < (r = 0 === E ? 0 : S / E) ? 1 : r),
                      "easeInQuad" === (t = c).easing && (o = n * n),
                      "easeOutQuad" === t.easing && (o = n * (2 - n)),
                      "easeInOutQuad" === t.easing &&
                        (o = n < 0.5 ? 2 * n * n : (4 - 2 * n) * n - 1),
                      "easeInCubic" === t.easing && (o = n * n * n),
                      "easeOutCubic" === t.easing && (o = --n * n * n + 1),
                      "easeInOutCubic" === t.easing &&
                        (o =
                          n < 0.5
                            ? 4 * n * n * n
                            : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1),
                      "easeInQuart" === t.easing && (o = n * n * n * n),
                      "easeOutQuart" === t.easing && (o = 1 - --n * n * n * n),
                      "easeInOutQuart" === t.easing &&
                        (o =
                          n < 0.5
                            ? 8 * n * n * n * n
                            : 1 - 8 * --n * n * n * n),
                      "easeInQuint" === t.easing && (o = n * n * n * n * n),
                      "easeOutQuint" === t.easing &&
                        (o = 1 + --n * n * n * n * n),
                      "easeInOutQuint" === t.easing &&
                        (o =
                          n < 0.5
                            ? 16 * n * n * n * n * n
                            : 1 + 16 * --n * n * n * n * n),
                      t.customEasing && (o = t.customEasing(n)),
                      o || n)),
                  w.scrollTo(0, Math.floor(f)),
                  b(f, g) || ((A = w.requestAnimationFrame(O)), (d = e));
              };
            0 === w.pageYOffset && w.scrollTo(0, 0),
              (m = i),
              (h = c),
              u ||
                (history.pushState &&
                  h.updateURL &&
                  history.pushState(
                    { smoothScroll: JSON.stringify(h), anchor: m.id },
                    document.title,
                    m === document.documentElement ? "#top" : "#" + m.id
                  )),
              "matchMedia" in w &&
              w.matchMedia("(prefers-reduced-motion)").matches
                ? w.scrollTo(0, Math.floor(g))
                : (Q("scrollStart", c, i, s),
                  C.cancelScroll(!0),
                  w.requestAnimationFrame(O));
          }
        });
      var t = function (e) {
          if (
            !e.defaultPrevented &&
            !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) &&
            "closest" in e.target &&
            (a = e.target.closest(o)) &&
            "a" === a.tagName.toLowerCase() &&
            !e.target.closest(I.ignore) &&
            a.hostname === w.location.hostname &&
            a.pathname === w.location.pathname &&
            /#/.test(a.href)
          ) {
            var t, n;
            try {
              t = r(decodeURIComponent(a.hash));
            } catch (e) {
              t = r(a.hash);
            }
            if ("#" === t) {
              if (!I.topOnEmptyHash) return;
              n = document.documentElement;
            } else n = document.querySelector(t);
            (n = n || "#top" !== t ? n : document.documentElement) &&
              (e.preventDefault(),
              (function (e) {
                if (history.replaceState && e.updateURL && !history.state) {
                  var t = w.location.hash;
                  (t = t || ""),
                    history.replaceState(
                      {
                        smoothScroll: JSON.stringify(e),
                        anchor: t || w.pageYOffset,
                      },
                      document.title,
                      t || w.location.href
                    );
                }
              })(I),
              C.animateScroll(n, a));
          }
        },
        n = function (e) {
          if (
            null !== history.state &&
            history.state.smoothScroll &&
            history.state.smoothScroll === JSON.stringify(I)
          ) {
            var t = history.state.anchor;
            ("string" == typeof t &&
              t &&
              !(t = document.querySelector(r(history.state.anchor)))) ||
              C.animateScroll(t, null, { updateURL: !1 });
          }
        };
      C.destroy = function () {
        I &&
          (document.removeEventListener("click", t, !1),
          w.removeEventListener("popstate", n, !1),
          C.cancelScroll(),
          (A = M = a = I = null));
      };
      return (
        (function () {
          if (
            !(
              "querySelector" in document &&
              "addEventListener" in w &&
              "requestAnimationFrame" in w &&
              "closest" in w.Element.prototype
            )
          )
            throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
          C.destroy(),
            (I = H(L, e || {})),
            (M = I.header ? document.querySelector(I.header) : null),
            document.addEventListener("click", t, !1),
            I.updateURL && I.popstate && w.addEventListener("popstate", n, !1);
        })(),
        C
      );
    };
  }
);
