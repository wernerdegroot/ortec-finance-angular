import { PersonAction } from 'example/model/person/PersonAction';

export type CompanyAction 
    = EmployeeAction;

export class EmployeeAction {
    
    public constructor(public employeeId: number, public employeeAction: PersonAction) {
        
    }
    
}