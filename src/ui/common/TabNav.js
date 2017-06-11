// @flow
import React, {PureComponent as Component} from 'react';
import {A} from './A';

class TabNavTab extends Component {

  props: {
    tab: {id: string, label: any, content: any},
    active: boolean,
    onSelect: string => any
  };

  render() {
    let {tab, active} = this.props;
    return (
      <A
        button
        className={'TabNav-tab' + (active ? ' TabNav-tab-active' : '')}
        onClick={this._onSelect}>
        {tab.label}
      </A>
    );
  }

  _onSelect = () => {
    this.props.onSelect(this.props.tab.id);
  }
}

export class TabNav extends Component {

  props: {
    tabs: Array<{
      id: string,
      label: any,
      content: any
    }>,
    initialTabId?: string
  };

  state = {
    activeTabId: this.props.initialTabId || this.props.tabs[0].id
  };

  render() {
    let {tabs} = this.props;
    let {activeTabId} = this.state;
    let activeTab = tabs.find(t => t.id === activeTabId);
    return (
      <div className='TabNav'>
        <div className='TabNav-tabs'>
          <div className='TabNav-tabs-inner'>
            {tabs.map(tab =>
              <TabNavTab
                key={tab.id}
                tab={tab}
                active={activeTabId === tab.id}
                onSelect={this._onSelectTab} />
            )}
          </div>
        </div>
        <div className='TabNav-tab-content'>
          {activeTab ? activeTab.content : null}
        </div>
      </div>
    );
  }

  _onSelectTab = (id: string) => {
    this.setState({activeTabId: id});
  }
}