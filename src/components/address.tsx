/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext } from "react-hook-form";
import { address } from '../fields/address.json';

interface AddressFormProps {
  fieldName: string; // Field name prefix (e.g., "permanentAddress" or "temporaryAddress")
}

const AddressForm: React.FC<AddressFormProps> = ({ fieldName }) => {
  const { register, formState: { errors } } = useFormContext();

  // Explicitly type the nested errors
  const addressErrors = errors[fieldName] as Record<string, any> | undefined;
  return (
    <div className="flex flex-wrap p-4 shadow-md rounded-md">
      {address.map((item, index) => {
        return (<div key={`${fieldName}.${item.name}`} className={`w-[49%] ${index % 2 === 0} ? mr-2 :'' mt-5`}>
          <label htmlFor={`${fieldName}.${item.name}`} className="block text-sm font-medium text-gray-700">{item.label}</label>
          <input
            id={`${fieldName}.${item.name}`}
            placeholder={item.placeholder}
            type={item.type}
            {...register(`${fieldName}.${item?.name}`, item.validation)}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  ${addressErrors?.[item?.name] ? 'border-red-500' : ''}`}
          />
          {addressErrors?.[item?.name] && <p className="text-red-500 text-sm">{addressErrors?.[item?.name]?.message}</p>}
        </div>

        )
      })
      }

    </div >
  );
};

export default AddressForm;
