"use client";

import { useEffect } from "react";

const COOKIE_NAME = "eh_visitor_id";
const STORAGE_KEY = "eh_visitor_profile";

declare global {
  interface Window {
    __ehTrack?: (eventName: string) => void;
  }
}

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax${secure}`;
}

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function trackEvent(eventName: string, details: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;

  const visitorId = readCookie(COOKIE_NAME) ?? createVisitorId();
  setCookie(COOKIE_NAME, visitorId);

  const previous = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as {
    visitedHotels?: string[];
    searchedDestinations?: string[];
    lastSearch?: string;
  };

  const entry = {
    eventName,
    visitorId,
    triggerAt: new Date().toISOString(),
    pathname: window.location.pathname,
    ...details,
  };

  const history = JSON.parse(window.localStorage.getItem("eh_event_history") ?? "[]") as Array<Record<string, string>>;
  history.push(entry);
  window.localStorage.setItem("eh_event_history", JSON.stringify(history.slice(-25)));

  if (eventName === "hotel_view") {
    previous.visitedHotels = [...(previous.visitedHotels ?? []), window.location.pathname];
  }

  if (eventName === "destination_search") {
    previous.lastSearch = window.location.pathname;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(previous));
}

export default function VisitorTracker() {
  useEffect(() => {
    const currentVisitor = readCookie(COOKIE_NAME) ?? createVisitorId();
    setCookie(COOKIE_NAME, currentVisitor);
    window.__ehTrack = trackEvent;
  }, []);

  return null;
}

