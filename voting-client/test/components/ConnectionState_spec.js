import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {ConnectionState} from '../../src/components/ConnectionState';

import {
renderIntoDocument,
        findRenderedDOMComponentWithTag,
        scryRenderedDOMComponentsWithTag,
        Simulate
} from 'react-dom/test-utils';

describe('ConnectionState', () => {

  it('is not visible when connected', () => {
    const component = renderIntoDocument(<ConnectionState connected={true} />);
    const div = findRenderedDOMComponentWithTag(component, 'div');
    expect(div.style.display).to.equal('none');
  });

  it('is visible when not connected', () => {
    const component = renderIntoDocument(<ConnectionState connected={false} />);
    const div = findRenderedDOMComponentWithTag(component, 'div');
    expect(div.style.display).to.equal('block');
  });

  it('contains connection state message', () => {
    const component = renderIntoDocument(
      <ConnectionState connected={false} state="Fail" />
    );
    const div = findRenderedDOMComponentWithTag(component, 'div');
    expect(div.textContent).to.contain('Fail');
  });

});