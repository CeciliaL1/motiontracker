
export interface IProfileAction {
    type: ActionProfileType; 
    payload: boolean;
};
export enum ActionProfileType {
    TOGGLE
}
  

export const ProfileReducer = (state: boolean, action: IProfileAction) => {
    if (action.type === ActionProfileType.TOGGLE) {

        return action.payload
    }
    return state
}