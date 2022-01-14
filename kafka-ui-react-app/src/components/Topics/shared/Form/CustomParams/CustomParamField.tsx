import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { TOPIC_CUSTOM_PARAMS } from 'lib/constants';
import { FieldArrayWithId, useFormContext, Controller } from 'react-hook-form';
import { remove as _remove } from 'lodash';
import { TopicFormData } from 'redux/interfaces';
import { InputLabel } from 'components/common/Input/InputLabel.styled';
import { FormError } from 'components/common/Input/Input.styled';
import Select from 'components/common/Select/Select';
import Option from 'components/common/Select/Option';
import Input from 'components/common/Input/Input';
import IconButtonWrapper from 'components/common/Icons/IconButtonWrapper';
import CloseIcon from 'components/common/Icons/CloseIcon';
import * as C from 'components/Topics/shared/Form/TopicForm.styled';

import * as S from './CustomParams.styled';

interface Props {
  isDisabled: boolean;
  index: number;
  existingFields: string[];
  field: FieldArrayWithId<TopicFormData, 'customParams', 'id'>;
  remove: (index: number) => void;
  setExistingFields: React.Dispatch<React.SetStateAction<string[]>>;
}

const CustomParamField: React.FC<Props> = ({
  field,
  isDisabled,
  index,
  remove,
  existingFields,
  setExistingFields,
}) => {
  const {
    formState: { errors },
    setValue,
    watch,
    control,
  } = useFormContext<TopicFormData>();
  const nameValue = watch(`customParams.${index}.name`);
  let prevName = '';

  React.useEffect(() => {
    prevName = nameValue;
  }, []);

  React.useEffect(() => {
    if (nameValue !== prevName) {
      let newExistingFields = [...existingFields];
      if (prevName) {
        newExistingFields = _remove(newExistingFields, (el) => el === prevName);
      }
      prevName = nameValue;
      newExistingFields.push(nameValue);
      setExistingFields(newExistingFields);
      setValue(`customParams.${index}.value`, TOPIC_CUSTOM_PARAMS[nameValue]);
    }
  }, [nameValue]);

  return (
    <C.Column>
      <>
        <div>
          <InputLabel>Custom Parameter</InputLabel>
          <Controller
            control={control}
            rules={{ required: 'Custom Parameter is required.' }}
            name={`customParams.${index}.name`}
            render={({ field: { name, onChange, value } }) => (
              <Select
                name={name}
                placeholder="Select"
                disabled={isDisabled}
                defaultValue={field.name}
                minWidth="270px"
                value={value}
                onChange={onChange}
              >
                {Object.keys(TOPIC_CUSTOM_PARAMS)
                  .sort()
                  .map((opt) => (
                    <Option
                      key={opt}
                      value={opt}
                      disabled={existingFields.includes(opt)}
                    >
                      {opt}
                    </Option>
                  ))}
              </Select>
            )}
          />
          <FormError>
            <ErrorMessage errors={errors} name={`customParams.${index}.name`} />
          </FormError>
        </div>
      </>

      <div>
        <InputLabel>Value</InputLabel>
        <Input
          name={`customParams.${index}.value` as const}
          hookFormOptions={{
            required: 'Value is required.',
          }}
          placeholder="Value"
          defaultValue={field.value}
          autoComplete="off"
          disabled={isDisabled}
        />
        <FormError>
          <ErrorMessage errors={errors} name={`customParams.${index}.value`} />
        </FormError>
      </div>

      <S.DeleteButtonWrapper>
        <IconButtonWrapper onClick={() => remove(index)} aria-hidden>
          <CloseIcon />
        </IconButtonWrapper>
      </S.DeleteButtonWrapper>
    </C.Column>
  );
};

export default React.memo(CustomParamField);
