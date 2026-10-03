/* investe.com.au — interactions.
   Small, dependency-free. Everything is progressive: without JS the page
   is complete; with reduced motion the effects are skipped. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
  var calm = mq("(prefers-reduced-motion: reduce)");
  var fine = mq("(hover: hover) and (pointer: fine)");

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    /* 1. Header: wordmark settles into the i_ mark once you scroll. */
    var bar = document.querySelector("[data-bar]");
    if (bar) {
      var onScroll = function () { bar.classList.toggle("is-scrolled", window.scrollY > 48); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* 2. Hero: the italic word turns italic letter by letter. */
    var em = document.querySelector("[data-reveal-italic]");
    if (em && !calm) {
      var word = em.textContent;
      var track = document.createElement("span");
      track.className = "ri-track";
      track.setAttribute("aria-hidden", "true");
      var cells = [];
      var probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      em.appendChild(probe);
      for (var i = 0; i < word.length; i++) {
        probe.textContent = word.charAt(i);
        var cell = document.createElement("span");
        cell.className = "ri-cell";
        cell.style.width = probe.getBoundingClientRect().width + "px";
        cell.innerHTML = '<span class="ri-up"></span><span class="ri-it"></span>';
        cell.firstChild.textContent = word.charAt(i);
        cell.lastChild.textContent = word.charAt(i);
        track.appendChild(cell);
        cells.push(cell);
      }
      em.removeChild(probe);
      em.classList.add("ri", "is-armed");
      em.appendChild(track);
      var HOLD = 900, STAGGER = 70;
      cells.forEach(function (c, idx) { setTimeout(function () { c.classList.add("is-on"); }, HOLD + idx * STAGGER); });
      setTimeout(function () {
        if (track.parentNode) track.parentNode.removeChild(track);
        em.classList.remove("is-armed", "ri");
      }, HOLD + word.length * STAGGER + 600);
    }

    /* 3. Hero artwork drifts gently with the pointer. */
    var media = document.querySelector("[data-parallax]");
    if (media && fine && !calm) {
      var card = media.parentNode, raf = 0, tx = 0, ty = 0;
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * -14;
        ty = ((e.clientY - r.top) / r.height - 0.5) * -10;
        if (!raf) raf = requestAnimationFrame(function () {
          raf = 0;
          media.style.transform = "translate3d(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px,0)";
        });
      });
      card.addEventListener("pointerleave", function () { media.style.transform = ""; });
    }

    /* 4. Statement: words fill in as it scrolls through the viewport. */
    var fill = document.querySelector("[data-wordfill]");
    if (fill && !calm) {
      var p = fill.querySelector("p");
      var words = [];
      var wrapText = function (node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              var s = document.createElement("span");
              s.className = "w"; s.textContent = part;
              frag.appendChild(s); words.push(s);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1) {
            if (n.classList.contains("is-highlight")) { n.classList.add("w"); words.push(n); }
            else wrapText(n);
          }
        });
      };
      wrapText(p);
      fill.classList.add("is-armed");
      var ticking = false;
      var update = function () {
        ticking = false;
        var r = p.getBoundingClientRect(), vh = window.innerHeight;
        var progress = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
        var lit = Math.round(Math.max(0, Math.min(1, progress)) * words.length);
        for (var k = 0; k < words.length; k++) words[k].classList.toggle("is-on", k < lit);
      };
      window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      window.addEventListener("resize", update);
      update();
    }

    /* 5. Highlight lamp: a soft light follows the pointer over highlighted words. */
    if (fine && !calm) {
      Array.prototype.forEach.call(document.querySelectorAll(".is-highlight"), function (el) {
        var lamp = document.createElement("span");
        lamp.className = "lamp"; lamp.setAttribute("aria-hidden", "true");
        lamp.textContent = el.textContent;
        el.appendChild(lamp);
        var at = function (e) {
          var r = el.getBoundingClientRect();
          el.style.setProperty("--lx", (e.clientX - r.left) + "px");
          el.style.setProperty("--ly", (e.clientY - r.top) + "px");
        };
        el.addEventListener("pointerenter", function (e) { el.classList.add("is-lit"); at(e); });
        el.addEventListener("pointermove", at);
        el.addEventListener("pointerleave", function () { el.classList.remove("is-lit"); });
      });
    }

    /* 6. Cards: a glow follows the pointer. */
    if (fine) {
      Array.prototype.forEach.call(document.querySelectorAll("[data-glow]"), function (c) {
        c.addEventListener("pointermove", function (e) {
          var r = c.getBoundingClientRect();
          c.style.setProperty("--mx", (e.clientX - r.left) + "px");
          c.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
      });
    }

    /* 7. Reveal on scroll, staggered within each group. */
    var reveals = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || calm) {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add("is-in"); });
    } else {
      Array.prototype.forEach.call(document.querySelectorAll(".cards"), function (list) {
        Array.prototype.forEach.call(list.children, function (el, idx) { el.style.setProperty("--i", idx); });
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
      Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
    }
  });
})();
