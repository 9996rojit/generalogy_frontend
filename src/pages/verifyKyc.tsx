import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import AddressForm from '../components/address';
import { basicInformation, documentInformation } from "../fields/verify-kyc.json"

interface KYCFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  bloodGroup: string;
  occupation: ''
  dateOfBirth: string;
  idDocument_front: File | null;
  idDocument_back: File | null;
  documentNumber: string;
  documentType: string;
  expires_in: string
  permanentAddress: Address;
  temporaryAddress: Address;
}

interface Address {
  desh: string;
  province: string;
  jilla: string;
  state: string;
  municipality: string;
}

const KYCVerify: React.FC = () => {
  const methods = useForm<KYCFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      bloodGroup: '',
      occupation: '',
      dateOfBirth: '',
      documentType: '',
      idDocument_front: null,
      idDocument_back: null,
      documentNumber: "",
      expires_in: "",
      permanentAddress: {
        desh: "",
        province: "",
        jilla: "",
        state: "",
        municipality: ""
      },
      temporaryAddress: {
        desh: "",
        province: "",
        jilla: "",
        state: "",
        municipality: ""
      }
    },
  });

  const onSubmit = (data: KYCFormData) => {
    console.log('KYC Data:', data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-lamaPurpleLight p-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-[80%] bg-white p-8 rounded-lg shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">KYC Verification</h2>
          <h3 className="text-xl font-semibold text-center text-gray-800">Basic Information</h3>
          <div className='flex flex-wrap'>
            {
              basicInformation.map((item, index) => (
                <div key={item.name} className={`w-[49%] ${index % 2 === 0} ? mr-2 :'' mt-5`}>
                  <label htmlFor={`${item.name}`} className="block text-sm font-medium text-gray-700">{item.label}</label>
                  <input
                    id={`${item.name}`}
                    placeholder={item.placeholder}
                    type={item.type}
                    {...methods.register(item?.name, item.validation)}
                    className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  ${methods.formState.errors[item?.name] ? 'border-red-500' : ''}`}
                  />
                  {methods.formState.errors[item.name] && <p className="text-red-500 text-sm">{methods.formState.errors[item.name]?.message}</p>}
                </div>
              ))
            }

          </div>




          {/* Date of Birth */}

          {/* Address */}
          <div>
            <h3 className="text-center text-xl mb-6 font-semibold">Permanent Information</h3>
          </div>
          <AddressForm fieldName='permanentAddress' />

          <div>
            <h3 className="text-center text-xl mb-6 font-semibold">Temporary Information</h3>
          </div>
          <AddressForm fieldName='temporaryAddress' />
          <div>
            <h3 className="text-center text-xl mb-6 font-semibold">Document Information</h3>
          </div>
          {/* Documents */}
          <div className='flex flex-wrap'>
            {/* Phone Number */}
            {documentInformation.map((item, index) => (
              <div key={item.name} className={`w-[49%] ${index % 2 === 0} ? mr-2 :'' mt-5`}>
                <label htmlFor={`${item.name}`} className="block text-sm font-medium text-gray-700">{item.label}</label>
                <input
                  id={`${item.name}`}
                  placeholder={item.placeholder}
                  type={item.type}
                  {...methods.register(item?.name, item.validation)}
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  ${methods.formState.errors[item?.name] ? 'border-red-500' : ''}`}
                />
                {methods.formState.errors[item.name] && <p className="text-red-500 text-sm">{methods.formState.errors[item.name]?.message}</p>}
              </div>
            ))}

          </div>



          {/* Submit Button */}
          <div className='flex items-center justify-center'>
            <button type="submit" className="w-1/2 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
              Submit KYC
            </button>
          </div>
        </form>
      </FormProvider>
    </div >
  );
};

export default KYCVerify;
