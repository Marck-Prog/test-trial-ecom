import React, { useEffect } from 'react'
import useSettingStore from '@/hooks/use-setting-store'
import { ClientSetting } from '@/types'

export default function AppInitializer({
  setting,
  children,
}: {
  setting: ClientSetting
  children: React.ReactNode
}) {
  useEffect(() => {
    // Set the initial setting in Zustand after render
    useSettingStore.setState({
      setting,
    })
  }, [setting]) // Runs when setting prop changes

  return children
}
