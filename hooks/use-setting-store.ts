/* eslint-disable no-unused-vars */

import data from '@/lib/data'
import { ClientSetting, SiteCurrency } from '@/types'
import { create } from 'zustand'

interface SettingState {
  setting: ClientSetting
  setSetting: (newSetting: ClientSetting) => void
  getCurrency: () => SiteCurrency
  setCurrency: (currency: string) => void
}

const useSettingStore = create<SettingState>((set, get) => ({
  setting: {
    ...data.settings[0],
    currency: data.settings[0].defaultCurrency,
  } as ClientSetting,
  setSetting: (newSetting: ClientSetting) => {
    // Merge the database's availableCurrencies with the initial data to ensure flag is preserved
    const mergedCurrencies = newSetting.availableCurrencies.map(
      (dbCurrency) => {
        const initialCurrency = data.settings[0].availableCurrencies.find(
          (c) => c.code === dbCurrency.code
        )
        return {
          ...dbCurrency,
          flag: dbCurrency.flag || initialCurrency?.flag || '', // Preserve flag from DB or initial data
        }
      }
    )

    set({
      setting: {
        ...newSetting,
        availableCurrencies: mergedCurrencies,
        currency: newSetting.currency || get().setting.currency,
      },
    })
  },
  getCurrency: () => {
    return (
      get().setting.availableCurrencies.find(
        (c) => c.code === get().setting.currency
      ) || data.settings[0].availableCurrencies[0]
    )
  },
  setCurrency: async (currency: string) => {
    set({ setting: { ...get().setting, currency } })
  },
}))

export default useSettingStore
