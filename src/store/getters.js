/*
 * MIT License
 * Copyright <2021-2022>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @Author: Sinda
 * @Email:  xhuicloud@163.com
 */

import { getColor } from '@/utils/theme'
import { themeKey } from '@/config'
import { getStorage } from '@/utils/storage'

const getters = {
  token: state => state.user.token,
  tenant: state => state.user.tenant,
  refreshToken: state => state.user.refreshToken,
  userInfo: state => state.user.userInfo,
  userMenus: state => state.user.userMenus,
  tenantId: state => state.user.tenant.id,
  permissions: state => state.user.permissions,
  roles: state => state.user.roles,
  sidebarStatus: state => state.app.sidebarStatus,
  language: state => state.app.lang,
  themeColor: state => state.theme.themeColor,
  sidebarLogo: state => state.theme.sidebarLogo,
  cardStyle: state => state.theme.cardStyle,
  ddCss: state => ({
    ...state.theme.variables,
    ...getColor(getStorage(themeKey))
  }),
  tagViews: state => state.app.tagViews,
  tagView: state => state.app.tagView
}
export default getters
