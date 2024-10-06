export default function usePhotoUrl(path: string, profile_photo_url: string) {
  return path ? `/storage/${path}` : profile_photo_url;
}
