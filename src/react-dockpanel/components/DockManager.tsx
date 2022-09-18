import React, { useRef } from 'react';
import { DockingEvent, IDockManager, DockEvent, DockPosition, Point, RenderEvent, CDockForm } from './interface';
import DockLayout from './DockLayout';
import { CDockPanel, FormActivateEvent } from '..';

export interface Theme {
  backgroundColor1?: string;
  backgroundColor2?: string;
  systemColor?: string;
}

const defaultTheme: Theme = {
  backgroundColor1: '#35496a',
  backgroundColor2: '#304261',
  systemColor: '#e8e8ec',
};
const styleWrapper = (theme?: Theme): React.CSSProperties => {
  return {
    backgroundColor: theme?.backgroundColor1 ?? defaultTheme.backgroundColor1,
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden' as 'hidden',
  };
};

export const DockManager = ({
  manager,
  onDock,
  onRenderForm,
  onRenderTab,
  onRenderPanel,
  onFormActivate,
  theme,
}: {
  manager: IDockManager;
  onRenderForm: (e: RenderEvent<CDockForm>) => void;
  theme?: Theme;
  onDock?: (e: DockEvent) => void;
  onRenderTab?: (e: RenderEvent<CDockForm>) => void;
  onRenderPanel?: (e: RenderEvent<CDockPanel>) => void;
  onFormActivate?: (e: FormActivateEvent) => void;
}) => {
  const blueprintRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const handleStack = (e: DockEvent) => {
    e.position = DockPosition.Center;
    handleDock(e);
  };

  const handleSplit = (e: DockEvent) => {
    // check which side the mouse is close to
    if (e.panel) {
      e.position = calcDockPosition(e.nativeEvent, e.panel);
      handleDock(e);
    }
  };

  const handleDock = (e: DockEvent) => {
    onDock && onDock(e);
    if (!e.isHandled) manager.dock(e.formId, e.panelId, e.position);
    const blueprint = blueprintRef.current;
    if (blueprint) hideBlueprint(blueprint);
  };

  const calcDockPosition = (e: DragEvent, destination: HTMLDivElement): DockPosition => {
    // test the edges
    const rect = destination.getBoundingClientRect();
    const left = Math.abs(rect.left - e.clientX);
    const right = Math.abs(rect.right - e.clientX);
    const top = Math.abs(rect.top - e.clientY);
    const bottom = Math.abs(rect.bottom - e.clientY);

    // calculate and test center location
    const topLeft = new Point(rect.left, rect.top);
    const bottomRight = new Point(rect.right, rect.bottom);
    const centerPoint = Point.mid(topLeft, bottomRight);
    const mousePoint = new Point(e.clientX, e.clientY);
    const center = Math.sqrt(Point.distance2(centerPoint, mousePoint));

    // find the nearest point
    const min = Math.min(left, right, top, bottom, center);
    if (min === top) return DockPosition.Top;
    else if (min === left) return DockPosition.Left;
    else if (min === bottom) return DockPosition.Bottom;
    else if (min === right) return DockPosition.Right;
    else if (min === center) return DockPosition.Center;

    return DockPosition.Unknown;
  };

  const handleStacking = (e: DockingEvent) => {
    const blueprint = blueprintRef.current;
    if (blueprint && e.panel) {
      const rect = e.panel.getBoundingClientRect();
      showBlueprint(blueprint, rect, DockPosition.Center);
    }
  };

  const handleSplitting = (e: DockingEvent) => {
    const blueprint = blueprintRef.current;
    if (blueprint && e.panel) {
      const position = calcDockPosition(e.nativeEvent, e.panel);
      const rect = e.panel.getBoundingClientRect();
      console.log(rect);
      showBlueprint(blueprint, rect, position);
    }
  };

  const showBlueprint = (blueprint: HTMLDivElement, rect: DOMRect, position: DockPosition) => {
    blueprint.style.display = 'block';

    const parentRect = parentRef.current!.getBoundingClientRect();
    const offsetX = -parentRect.x;
    const offsetY = -parentRect.y;

    if (position === DockPosition.Center) {
      blueprint.style.top = `${rect.top + offsetY}px`;
      blueprint.style.left = `${rect.left + offsetX}px`;
      blueprint.style.bottom = `${rect.bottom}px`;
      blueprint.style.right = `${rect.right}px`;
      blueprint.style.width = `${rect.width}px`;
      blueprint.style.height = `${rect.height}px`;
    } else if (position === DockPosition.Bottom) {
      blueprint.style.top = `${rect.top + rect.height / 2 + offsetY}px`;
      blueprint.style.left = `${rect.left + offsetX}px`;
      blueprint.style.bottom = `${rect.bottom}px`;
      blueprint.style.right = `${rect.right}px`;
      blueprint.style.width = `${rect.width}px`;
      blueprint.style.height = `${rect.height / 2}px`;
    } else if (position === DockPosition.Right) {
      blueprint.style.top = `${rect.top + offsetY}px`;
      blueprint.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
      blueprint.style.bottom = `${rect.bottom}px`;
      blueprint.style.right = `${rect.right}px`;
      blueprint.style.width = `${rect.width / 2}px`;
      blueprint.style.height = `${rect.height}px`;
    } else if (position === DockPosition.Top) {
      blueprint.style.top = `${rect.top + offsetY}px`;
      blueprint.style.left = `${rect.left + offsetX}px`;
      blueprint.style.bottom = `${rect.bottom - rect.height / 2}px`;
      blueprint.style.right = `${rect.right}px`;
      blueprint.style.width = `${rect.width}px`;
      blueprint.style.height = `${rect.height / 2}px`;
    } else if (position === DockPosition.Left) {
      blueprint.style.top = `${rect.top + offsetY}px`;
      blueprint.style.left = `${rect.left + offsetX}px`;
      blueprint.style.bottom = `${rect.bottom}px`;
      blueprint.style.right = `${rect.right - rect.width / 2}px`;
      blueprint.style.width = `${rect.width / 2}px`;
      blueprint.style.height = `${rect.height}px`;
    }
  };

  const hideBlueprint = (blueprint: HTMLDivElement) => {
    blueprint && (blueprint.style.display = 'none');
  };

  const handleFormActivate = (e: FormActivateEvent) => {
    onFormActivate && onFormActivate(e);
    if (!e.isHandled) {
      manager.activate(e.panel.id, e.panel.activeIndex);
    }
  };

  return (
    <div ref={parentRef} style={styleWrapper(theme)} className="dock-manager">
      <DockLayout
        layout={manager.layout}
        onStack={handleStack}
        onSplit={handleSplit}
        onStacking={handleStacking}
        onSplitting={handleSplitting}
        onRenderForm={onRenderForm}
        onRenderTab={onRenderTab}
        onRenderPanel={onRenderPanel}
        onFormActivate={handleFormActivate}
      />
      <div
        ref={blueprintRef}
        style={{
          pointerEvents: 'none',
          position: 'relative' as 'relative',
          transition: 'all 0.12s ease-in',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        className="dock-area"
      ></div>
    </div>
  );
};
