import { T_User } from "../Users/T_User";
import { T_Client } from "../Client/T_Client";
import { T_Address } from "../Address/T_Address";
export interface T_CardAndTable {
    type: string;
    data?: T_User | T_Client | T_Address | any;
    buttons?: boolean

    // Users
    setDataUser?: (user: T_User) => void;
    processUpdateInformationUser?: () => void;
    processDeleteInformationUser?: () => void;

    // Clients
    setDataClient?: (client: T_Client) => void;
    processUpdateInformationClient?: () => void;
    processDeleteInformationClient?: () => void;

    // Address
    setDataAddress?: (address: T_Address) => void;
    processUpdateInformationAddress?: () => void;
    processDeleteInformationAddress?: () => void;
    processViewAddressInformation?: () => void;
    handleGetByIdAddress?: (id: number) => void;
}
