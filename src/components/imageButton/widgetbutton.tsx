import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary'; // Certifique-se de que o CldUploadWidget está importado corretamente
import { Button } from '../ui/button';

const VehicleImage = () => {
  const [publicId, setPublicId] = useState<string>('');

  return (      
      <div>
        <CldUploadWidget
          uploadPreset="ml_default"
        >
          {({ open, results, error }) => {
            if (results?.event === 'success') {
              console.log('Uploaded image:', results.info);
              setPublicId(results?.info?.public_id);
              console.log('Public ID:', results?.info?.public_id);
            }
            return (
              <Button
                
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Impede o envio do formulário
                  open();
                }}
              >
                Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
      
  )
};

export default VehicleImage;
