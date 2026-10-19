// Mirror of schema/pack.schema.json, embedded so imports can be validated
// outside this repository (D-9). A test keeps the two identical.
export const PACK_SCHEMA = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://omnilex.org/schema/pack.schema.json",
  "title": "OmniLex Pack Descriptor (pack.json)",
  "type": "object",
  "required": [
    "id",
    "version",
    "formatVersion",
    "kind",
    "title",
    "domains",
    "locales",
    "requires",
    "concepts",
    "status",
    "license"
  ],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^(@[a-z0-9-]+/)?[a-z0-9-]+(\\.[a-z0-9-]+)*$"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+"
    },
    "formatVersion": {
      "type": "integer",
      "minimum": 1
    },
    "kind": {
      "enum": [
        "content",
        "meta"
      ]
    },
    "title": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "domains": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "locales": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "requires": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "concepts": {
      "type": "integer",
      "minimum": 0
    },
    "status": {
      "type": "object",
      "additionalProperties": {
        "type": "integer",
        "minimum": 0
      }
    },
    "tiers": {
      "type": "object",
      "propertyNames": {
        "enum": [
          "terms",
          "cards",
          "search",
          "explanations",
          "vectors"
        ]
      },
      "additionalProperties": {
        "type": "object",
        "required": [
          "bytes",
          "files"
        ],
        "properties": {
          "bytes": {
            "type": "integer",
            "minimum": 0
          },
          "configHash": {
            "type": "string"
          },
          "files": {
            "type": "object",
            "additionalProperties": {
              "type": "object",
              "required": [
                "bytes",
                "sha256"
              ],
              "properties": {
                "bytes": {
                  "type": "integer",
                  "minimum": 0
                },
                "sha256": {
                  "type": "string",
                  "pattern": "^[0-9a-f]{64}$"
                }
              },
              "additionalProperties": false
            }
          }
        },
        "additionalProperties": false
      }
    },
    "license": {
      "type": "string"
    },
    "role": {
      "enum": [
        "starter"
      ]
    },
    "attributions": {
      "type": "object",
      "required": [
        "path",
        "bytes",
        "sha256"
      ],
      "properties": {
        "path": {
          "const": "attributions.json"
        },
        "bytes": {
          "type": "integer",
          "minimum": 0
        },
        "sha256": {
          "type": "string",
          "pattern": "^[0-9a-f]{64}$"
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false,
  "if": {
    "properties": {
      "kind": {
        "const": "meta"
      }
    }
  },
  "then": {
    "not": {
      "required": [
        "tiers"
      ]
    }
  },
  "else": {
    "required": [
      "tiers"
    ]
  }
} as const;
