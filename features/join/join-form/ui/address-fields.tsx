// features/join/join-form/ui/address-fields.tsx
import { FormField } from './form-field';
import { useJoinFormStore } from '../../model/store';

export const AddressFields = () => {
  const { data, setAddressField } = useJoinFormStore();

  return (
    <div className="space-y-4">
      <FormField
        id="city"
        label="도시"
        value={data.address.city}
        onChange={(value) => setAddressField('city', value)}
        placeholder="도시를 입력하세요"
      />
      <FormField
        id="street"
        label="상세주소"
        value={data.address.street}
        onChange={(value) => setAddressField('street', value)}
        placeholder="상세주소를 입력하세요"
      />
      <FormField
        id="zipcode"
        label="우편번호"
        value={data.address.zipcode}
        onChange={(value) => setAddressField('zipcode', value)}
        placeholder="우편번호를 입력하세요"
      />
    </div>
  );
};
