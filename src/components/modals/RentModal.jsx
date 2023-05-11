import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useMemo, useState } from "react";
import { categories } from '../navbar/Categories';
import useRentModal from '../../hooks/useRentModal';
import Map from "../Map"

import Modal from "./Modal";
import Input from "../inputs/Input";

import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from '../inputs/ImageUpload';

import Heading from "../Heading";
import Button from "../Button";
import CategoryInput from '../inputs/CategoryInput';
import { useForm } from 'react-hook-form';


const STEPS = {
CATEGORY: 0,
LOCATION: 1,
INFO: 2,
IMAGES: 3,
DESCRIPTION: 4,
PRICE: 5,
};



function RentModal() {
 
 const rentModal = useRentModal();
 const [isLoading, setIsLoading] = useState(false);
 const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);



  const onSubmit = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
  setIsLoading(true);
    console.log('d',data)

    axios.post('https://dianikonnect.onrender.com/listings', data)
    .then(() => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm({
    defaultValues: {
      category: '',
      location_value: null,
      guest_count: 1,
      room_count: 1,
      bathroom_count: 1,
      image_src: '',
      price: 1,
      title: '',
      description: '',
    }
  });
  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }


  const location_value = watch('location_value');
  const category = watch('category');
  const guest_count = watch('guest_count');
  const room_count = watch('room_count');
  const bathroom_count = watch('bathroom_count');
  const image_src = watch('image_src');

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )


  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect 
               value={location_value} 
          onChange={(value) => setCustomValue('location_value', value)} 
        />
        <Map center={location_value?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter 
          onChange={(value) => setCustomValue('guest_count', value)}
          value={guest_count}
          title="Guests" 
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('room_count', value)}
          value={room_count}
          title="Rooms" 
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('bathroom_count', value)}
          value={bathroom_count}
          title="Bathrooms" 
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
           onChange={(value) => setCustomValue('image_src', value)}
          value={image_src}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice 
          type="number" 
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <>
   <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Add a new Listing!"
       actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
       secondaryActionLabel={secondaryActionLabel}
       secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
    </>
  )
}

export default RentModal
