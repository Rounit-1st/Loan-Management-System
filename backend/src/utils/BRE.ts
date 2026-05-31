export function checkBussinessRules(dob: any, monthlySalary: number){
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if(age < 23 || age > 50) {
        return {
            success: false,
            message: "Borrower must be between 23 and 50 years old to be eligible for loan"
        }
    }

    if(monthlySalary <= 25000){
        return {
            success: false,
            message: "monthly salary must be greater than 25000 to be eligible for loan"
        }
    }
    return null;
}