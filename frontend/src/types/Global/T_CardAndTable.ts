import { T_MenuSocial } from "../MenuSocial/T_MenuSocial"
import { T_Groups } from "../Groups/T_Groups"
import { T_Menu } from "../Menus/T_Menu"
import { T_Permission } from "../Permission/T_Permission"
import { T_User } from "../Users/T_User"
import { T_GeneralStatus } from "../GeneralStatus/T_GeneralStatus"
import { T_Category } from "../Categories/T_Category"
import { T_StandardMessage } from "../StandardMessage/T_StandardMessage"
import { T_TermUse } from "../TermUse/T_TermUse"
import { T_Client } from "../Client/T_Client"
import { T_Equipment } from "../Equipment/T_Equipment"
import { T_Call } from "../Call/T_Call"
import { T_Solicitation } from "../Solicitation/T_Solicitation"
import { T_ServiceOrder } from "../ServiceOrder/T_ServiceOrder"

export interface T_CardAndTable {
    type: string
    data?: T_User | any

    // Users
    setDataUser?: (user: T_User) => void
    processGroupInformationUser?: () => void
    processPermissionInformationUser?: () => void
    processUpdateInformationUser?: () => void
    processDeleteInformationUser?: () => void

    // Groups
    handleRemoveGroup?: (e: T_Groups) => void
    handleUpdateGroup?: (e: T_Groups) => void
    handleViewPermissionsGroup?: (e: T_Groups) => void
    handleAddGroupMenu?: (e: T_Groups) => void
    viewUsers?: (e: T_Groups) => void

    // Permissions
    handleUpdatePermissions?: (e: T_Permission) => void
    handleRemovePermissions?: (e: T_Permission) => void

    // Menu Link
    handleEditMenuLink?: (e: T_MenuSocial) => void
    handleRemoveMenuLink?: (e: T_MenuSocial) => void

    // Menu Item
    setDataItemsMenu?: (itemsMenu: T_Menu) => void
    handleUpdateItemsMenu?: () => void
    handleRemoveItemsMenu?: () => void

    // Menu
    setDataMenu?: (menu: T_Menu) => void
    handleUpdateMenu?: () => void
    handleRemoveMenu?: () => void

    // General Status
    setDataGeneralStatus?: (status: T_GeneralStatus) => void
    handleUpdateGeneralStatus?: () => void
    handleRemoveGeneralStatus?: () => void

    // Category
    setDataCategory?: (category: T_Category) => void
    handleUpdateCategory?: () => void
    handleRemoveCategory?: () => void

    // Standard Message
    setDataStandardMessage?: (standardMessage: T_StandardMessage) => void
    handleUpdateStandardMessage?: () => void
    handleRemoveStandardMessage?: () => void

    // Term Use
    setDataTermUse?: (termUse: T_TermUse) => void
    handleUpdateTermUse?: () => void
    handleRemoveTermUse?: () => void
    handleViewTermUse?: () => void

    // Clients
    setDataClients?: (client: T_Client) => void
    handleUpdateClient?: () => void
    handleViewClient?: () => void
    handleViewEquipments?: (client: T_Client) => void
    handleLinkUsers?: (client: T_Client) => void

    // Equipments
    setDataEquipment?: (equipments: T_Equipment) => void
    handleUpdateEquipment?: () => void
    handleRemoveEquipment?: () => void
    handleViewEquipment?: () => void

    // Calls
    setDataCall?: (call: T_Call) => void
    handleAnswerCall?: () => void
    handleTechnicalDefinitionCall?: (item: T_Call) => void
    handleViewEquipmentById?: (id: number) => void

    // Solicitations
    setDataSolicitation?: (solicitation: T_Solicitation) => void

    // Service Order
    setDataServiceOrder?: (serviceOrder: T_ServiceOrder) => void
    handleTechnicalDefinitionServiceOrder?: (item: T_ServiceOrder) => void
    handleAlterStatusServiceOrder?: (item: T_ServiceOrder) => void
    handleViewDetailsById?: (id: number) => void
    handleAnswerServiceOrder?: () => void
    handleAppointmentsServiceOrder?: (id: number) => void
}
