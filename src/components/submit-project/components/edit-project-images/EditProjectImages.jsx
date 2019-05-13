import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import styles from './EditProjectImages.module.css';
import dragReorder from '../../../utils/dragReorder';
import urlToFile from '../../../utils/urlToFile';
import { downloadProjectImages, uploadProjectImages, deleteProjectImages } from '../../../../firebase/storage';

const EditProjectImages = (props) => {
  const { pid } = props;

  // the state
  const [ loading, setLoading ] = useState(false);
  const [ imageFiles, setImageFiles ] = useState([]);
  const [ imagePreviews, setImagePreviews ] = useState([]);

  /**
* retrieves existing images from Cloud Storage via Firestore
* meant to be run once on mount
*/
  const handleExistingImages = async () => {
    setLoading(true);
    const images = await downloadProjectImages(pid)
    setImageFiles([ ...images.imageFiles ]);
    setImagePreviews([ ...images.imagePreviews ]);
    setLoading(false);
  }

  // retrieve existing images on mount
  useEffect(() => {
    handleExistingImages()
  }, [])

  // used to make a custom file input button
  const inputRef = React.createRef();
  const handleInputClick = () => {
    inputRef.current.click();
  };

  /**
   * syncs Cloud Storage and Firestore with the files in real time
   */
  const handleSyncImages = async (imageFilesForSync) => {
    // delete the old images
    await deleteProjectImages(pid);
    // upload the new ones to Cloud Storage
    const imageURLs = await uploadProjectImages(pid, imageFilesForSync);
    // update Firestore
    // await setProjectImages(pid, imageURLs);
  }

  /**
   * retrieves a random, stock illustration
   */
  const handleShuffleClick = async () => {
    setLoading(true);
    // make a request to external service, which returns a random image as base64 string
    let file = null;
    try {
      const result = await axios.get('https://randomillustration.herokuapp.com/');
      const data = `data:image/png;base64,${ result.data }`;
      // use helper method to convert base64 string to image file object
      file = await urlToFile(data, 'stock.png', 'image/*');
    } catch (e) {
      console.log(e);
    }
    // sync to Storage + Db and update state
    await handleSyncImages([ file, ...imageFiles ]);
    setImagePreviews([ URL.createObjectURL(file), ...imagePreviews ]);
    setImageFiles([ file, ...imageFiles ]);
    setLoading(false);
  };

  /**
   * removes the image
   */
  const handleRemoveImage = async (index) => {
    setLoading(true);
    // create copies of the state with the image removed
    const cpyPreviews = [ ...imagePreviews ];
    cpyPreviews.splice(index, 1);
    const cpyFiles = [ ...imageFiles ];
    cpyFiles.splice(index, 1);
    // sync to Storage + Db and update state
    await handleSyncImages(cpyFiles);
    setImagePreviews(cpyPreviews);
    setImageFiles(cpyFiles);
    setLoading(false);
  };

  /**
 * when a user uploads a file on their computer
 * @param {*} event : on click
 */
  const handleAddImage = async (event) => {
    const { target: { files } } = event;
    const file = files[0];
    setLoading(true);
    await handleSyncImages([ file, ...imageFiles ]);
    setImageFiles([ file, ...imageFiles ]);
    setImagePreviews([ URL.createObjectURL(file), ...imagePreviews ]);
    setLoading(false);
  };

  /**
   * when a user drags and drops to reorder the images
   */
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    setLoading(true);
    const reorderedImagePreviews = dragReorder(imagePreviews, oldIndex, newIndex);
    const reorderedImageFiles = dragReorder(imageFiles, oldIndex, newIndex);
    await handleSyncImages(reorderedImageFiles);
    setImagePreviews(reorderedImagePreviews);
    setImageFiles(reorderedImageFiles);
    setLoading(false);
  };

  /**
   * React component which is used to implement the drag-drop behavior
   * wraps each image thumbnail
   */
  const SortableImagePreview = SortableElement(({ preview, index }) => (
    <div className={styles.image}>
      <img src={preview} className={styles.imageDOM} alt="preview" />
      <button type="button" onClick={() => handleRemoveImage(index)} className={styles.imageCross}>
        <FontAwesomeIcon icon="times" />
      </button>
    </div>
  ));

  /**
   * React component which is used to implement the drag-drop behavior
   * wraps all thumbnails and other interactive elements
   */
  const SortableImagePreviewList = SortableContainer(({ previews }) => (
    <div className={styles.images}>
      {/* loading placeholder */}
      {loading ? (
        <div className={styles.placeholder}>
          <FontAwesomeIcon icon="circle-notch" spin />
        </div>
      ) : null}
      {/* images */}
      {previews.map((preview, index) => (
        <SortableImagePreview key={`item-${ index }`} index={index} preview={preview} />
      ))}
      {/* add image input */}
      <div className={styles.placeholder}>
        {/* your own image */}
        <button type="button" className={styles.placeholderItem} onClick={handleInputClick}>
          <FontAwesomeIcon icon="plus" />
        </button>
        {/* a random image */}
        <button type="button" className={styles.placeholderItem} onClick={handleShuffleClick}>
          <FontAwesomeIcon icon="random" />
        </button>
        {/* hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="pictureFlexItem uploadNewPicture"
          onChange={handleAddImage}
        />
      </div>
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Add images to your project</div>
      <SortableImagePreviewList
        previews={imagePreviews}
        onSortEnd={onSortEnd}
        axis="xy"
        distance={2}
      />
      <div className={styles.helptext}>
        Reorder images by their relative importance. The first image will be used on the Projects
        page view.
        <br />
        Click the shuffle button to use one of our illustrations, courtesy of Icons8.
      </div>
    </div>
  );
};

export default EditProjectImages;
