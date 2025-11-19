
'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Link, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type ImageUploaderProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function ImageUploader({ value, onChange, disabled }: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = () => {
    if (urlInput) {
      onChange(urlInput);
      setUrlInput('');
    }
  };

  const handleRemoveImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative group">
          <Card>
            <CardContent className="p-2">
              <div className="aspect-video relative">
                <Image src={value} alt="Image preview" layout="fill" objectFit="contain" />
              </div>
            </CardContent>
          </Card>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Or paste an image URL"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={disabled}
            />
            <Button type="button" onClick={handleUrlChange} disabled={disabled || !urlInput}>
              <Link className="mr-2 h-4 w-4" /> Use URL
            </Button>
          </div>
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload an Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
}
