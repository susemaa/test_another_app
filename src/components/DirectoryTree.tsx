'use client';

import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import type { Tree } from '@/lib/types';

interface CustomToggleProps {
  children: React.ReactNode;
  eventKey: string;
}

function CustomToggle({ children, eventKey }: CustomToggleProps) {
  const [isActive, setIsActive] = useState<true | false>(false);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setIsActive(!isActive);
  });

  return (
    <>
      <button
        type="button"
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: '0',
          transform: isActive ? 'rotate(90deg)' : 'none',
          transition: 'transform 0.2s',
          cursor: 'pointer',
        }}
        onClick={decoratedOnClick}
      >
        {'>'}
      </button>
      {children}
    </>
  );
}

interface DirectoryTreeProps {
  tree: Tree[];
  level?: number;
}

function DirectoryTree({ tree, level = 0 }: DirectoryTreeProps) {
  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      {tree.map((service) => (
        <Card key={service.id} style={{ background: 'none', marginLeft: `${20 * level}px` }}>
          <Card.Header style={{ border: '0', background: 'none' }}>
            {service.node === 1 ? (
              <CustomToggle eventKey={String(service.id)}>
                {service.name}
              </CustomToggle>
            ) : (
              <div className="d-flex justify-content-between">
                <div>{service.name}</div>
                <div>
                  {service.price}
                  {' '}
                  руб
                </div>
              </div>
            )}
          </Card.Header>
          {service.node === 1 && service.children && (
            <Accordion.Collapse eventKey={String(service.id)}>
              <Card.Body style={{ border: '0' }}>
                <DirectoryTree tree={service.children} level={level + 1} />
              </Card.Body>
            </Accordion.Collapse>
          )}
        </Card>
      ))}
    </Accordion>
  );
}

export default DirectoryTree;
