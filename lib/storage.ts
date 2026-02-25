import { supabase } from './supabase';

export const uploadEventImage = async (file: File, eventId: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${eventId}-${Date.now()}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('event-images')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading event image:', error);
    return null;
  }

  const { data } = supabase.storage.from('event-images').getPublicUrl(fileName);
  return data.publicUrl;
};

export const uploadTestimonialImage = async (file: File, testimonialId: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${testimonialId}-${Date.now()}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('testimonial-images')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading testimonial image:', error);
    return null;
  }

  const { data } = supabase.storage.from('testimonial-images').getPublicUrl(fileName);
  return data.publicUrl;
};

export const deleteEventImage = async (imageUrl: string): Promise<boolean> => {
  const fileName = imageUrl.split('/').pop();
  if (!fileName) return false;

  const { error } = await supabase.storage
    .from('event-images')
    .remove([fileName]);

  if (error) {
    console.error('Error deleting event image:', error);
    return false;
  }
  return true;
};

export const deleteTestimonialImage = async (imageUrl: string): Promise<boolean> => {
  const fileName = imageUrl.split('/').pop();
  if (!fileName) return false;

  const { error } = await supabase.storage
    .from('testimonial-images')
    .remove([fileName]);

  if (error) {
    console.error('Error deleting testimonial image:', error);
    return false;
  }
  return true;
};
