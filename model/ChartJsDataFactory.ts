class ChartJsDataFactory {
    label: string;
    value: string | number;
    unit: string;
    color: string;
    cutout: string;

    constructor(label:string, value:string | number, unit:string, color:string, cutout:string) {
        this.label = label;
        this.value = value;
        this.unit = unit;
        this.color = color;
        this.cutout = cutout;
    }
  
}

export default ChartJsDataFactory