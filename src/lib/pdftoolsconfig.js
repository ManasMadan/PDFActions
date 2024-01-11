const pdftoolsconfig = {
  merge: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  split: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  rotate: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  image_to_pdf: {
    dropZoneProps: {
      accept: {
        "image/jpeg": [],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  add_page_number: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  resize: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  add_margin: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  combine_pages: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  extract_pages: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  remove_pages: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  reorder_pages: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  rotate_pages: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  extract_images: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  break_pdf: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  flatten_forms: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  edit_metadata: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  remove_metadata: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  compress: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  html_to_pdf: {
    dropZoneProps: {
      accept: {
        "application/html": [".html"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  watermark: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  unlock: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  protect: {
    dropZoneProps: {
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: true,
    },
    preProcessFile: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
};

export default pdftoolsconfig;
