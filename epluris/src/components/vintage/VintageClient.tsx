"use client";
import { useEffect } from "react";

export default function VintageClient() {
  useEffect(() => {
    // Animate meter fills
    setTimeout(() => {
      document.querySelectorAll(".meter-fill").forEach((el) => {
        const fill = el as HTMLElement;
        const width = fill.style.width || "0%";
        fill.style.width = "0%";
        setTimeout(() => (fill.style.width = width), 300);
      });
    }, 500);

    // Draggable widgets
    const widgets = Array.from(document.querySelectorAll(".guide-widget")) as HTMLElement[];
    let activeWidget: HTMLElement | null = null;
    let offsetX = 0;
    let offsetY = 0;

    function startDrag(e: MouseEvent) {
      const target = e.currentTarget as HTMLElement;
      if ((e.target as HTMLElement).classList.contains("guide-btn")) return;
      activeWidget = target.parentElement as HTMLElement;
      if (!activeWidget) return;
      const rect = activeWidget.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      activeWidget.style.position = "fixed";
      activeWidget.style.zIndex = "1000";
      activeWidget.style.cursor = "grabbing";
      activeWidget.style.boxShadow = "0 10px 30px rgba(93,64,55,0.3)";
      document.addEventListener("mousemove", dragWidget);
      document.addEventListener("mouseup", stopDrag);
    }

    function dragWidget(e: MouseEvent) {
      if (!activeWidget) return;
      activeWidget.style.left = e.clientX - offsetX + "px";
      activeWidget.style.top = e.clientY - offsetY + "px";
    }

    function stopDrag() {
      if (!activeWidget) return;
      activeWidget.style.position = "relative";
      activeWidget.style.cursor = "";
      activeWidget.style.boxShadow = "";
      activeWidget.style.left = "";
      activeWidget.style.top = "";
      document.removeEventListener("mousemove", dragWidget);
      document.removeEventListener("mouseup", stopDrag);
      setTimeout(() => {
        if (activeWidget) activeWidget.style.zIndex = "";
        activeWidget = null;
      }, 10);
    }

    widgets.forEach((widget) => {
      const header = widget.querySelector(".widget-header") as HTMLElement;
      if (!header) return;
      header.addEventListener("mousedown", startDrag);
      header.addEventListener("selectstart", (e) => e.preventDefault());
      header.style.cursor = "grab";
      widget.addEventListener("mouseenter", () => (widget.style.transform = "translateY(-5px) rotate(0.5deg)"));
      widget.addEventListener("mouseleave", () => (widget.style.transform = "translateY(0) rotate(0deg)"));
    });

    // Typewriter footer
    const footerText = document.querySelector(".data-source");
    if (footerText) {
      const originalText = footerText.textContent || "";
      footerText.textContent = "";
      let i = 0;
      function typeFooter() {
        if (i < originalText.length && footerText) {
          footerText.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeFooter, 40);
        }
      }
      setTimeout(typeFooter, 800);
    }

    return () => {
      // cleanup: remove event listeners
      widgets.forEach((widget) => {
        const header = widget.querySelector(".widget-header");
        if (!header) return;
        header.removeEventListener("mousedown", startDrag as EventListener);
        header.removeEventListener("selectstart", (e) => e.preventDefault());
      });
    };
  }, []);

  return null;
}
