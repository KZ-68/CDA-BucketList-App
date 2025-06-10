export default function percent(leftOperand:number, rightOperand:number, fixed:number):string {
    return((leftOperand * 100 / rightOperand).toFixed(fixed));
}