'use client';

import React from 'react';

// Isolates non-critical widgets (e.g. the hero canvas): if one throws,
// the rest of the page keeps working instead of unmounting.
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
