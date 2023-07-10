import {firebaseApp} from "../../keys/firebase";

import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

export const addToStorage = async (
  directory: string,
  name: string,
  file: Blob | File
) => {
  // STORAGE
  const str = getStorage(firebaseApp);
  const refName: string = `/${directory}/${name}`;
  const refs = ref(str, refName);

  // AGREGAR
  return uploadBytes(refs, file);
};

export const removeFromStorage = async (directory: string, name: string) => {
  // STORAGE
  const str = getStorage(firebaseApp);
  const refName: string = `/${directory}/${name}`;
  const refs = ref(str, refName);

  // AGREGAR
  return deleteObject(refs);
};

export const getURLFromStorage = async (directory: string, name: string) => {
  const str = getStorage(firebaseApp);
  const refName: string = `/${directory}/${name}`;
  const refs = ref(str, refName);
  return getDownloadURL(refs);
};
