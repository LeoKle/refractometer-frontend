import { InputNumber } from "primereact/inputnumber";
import { Vector } from "../../interfaces/Vector.interface";

type InputFieldProps = {
  vector: Vector;
  setFunction: (value: Vector) => void;
};

const VectorInputField: React.FC<InputFieldProps> = ({ vector, setFunction }) => {
  const handleXChange = (e: any) => {
    setFunction({ ...vector, x: e.value });
  };

  const handleYChange = (e: any) => {
    setFunction({ ...vector, y: e.value });
  };

  const handleZChange = (e: any) => {
    setFunction({ ...vector, z: e.value });
  };

  return (
    <div className="flex flex-row gap-1">
      <InputNumber value={vector.x} onValueChange={handleXChange} minFractionDigits={2} />
      <InputNumber value={vector.y} onValueChange={handleYChange} minFractionDigits={2} />
      <InputNumber value={vector.z} onValueChange={handleZChange} minFractionDigits={2} />
    </div>
  );
};

export default VectorInputField;