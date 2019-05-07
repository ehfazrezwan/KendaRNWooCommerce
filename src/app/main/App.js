import React from 'react'
import { StatusBar } from 'react-native'
import Router from './Router'
import { Languages, Constants, Global } from '@common'
import I18n from 'react-native-i18n'
import Drawer from '@libs/drawer'
import { LeftMenu, Toast } from '@components'
class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.setupI18n()
    StatusBar.setBarStyle('light-content', true)

    this.state = {
      show: false
    }
  }

  render() {
    return (
      <Drawer
        open={this.state.show}
        type="overlay"
        content={<LeftMenu onOpenPage={this.onOpenPage} onLogout={this.onLogout} onLogin={this.onLogin} />}
        tapToClose={true}
        onClose={this.onClose}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <Router />
        <Toast position={'bottom'} ref="toast" />
      </Drawer>
    )
  }

  componentDidMount() {
    this.dawerOpenListener = Global.EventEmitter.addListener(Constants.EventEmitterName.OpenDrawer, this.openDawer)
    this.openToast = Global.EventEmitter.addListener(Constants.EventEmitterName.showToast, this.showToast)
  }

  showToast = (msg) => {
    this.refs.toast.showMessage(msg)
  }


  componentWillUnmount() {
    this.dawerOpenListener.remove()
    this.openToast.remove()
  }

  openDawer = () => {
    this.setState({ show: true })
  }

  onClose = () => {
    this.setState({ show: false })
  }

  onOpenPage = (item) => {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.OpenPage, item)
    })
  }

  onLogout = () => {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.onLogout)
    })
  }

  onLogin = () => {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.onLogin)
    })
  }

  setupI18n = () => {
    I18n.fallbacks = true
    I18n.translations = Languages
    global.__ = I18n
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 }
}
export default App

