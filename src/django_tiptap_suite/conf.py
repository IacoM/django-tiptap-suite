from django.conf import settings

class TiptapSuiteConfigProxy:
    def get(self, key, default=None):
        config = getattr(settings, "TIPTAP_SUITE_CONFIG", {})
        return config.get(key, default)

    def __getitem__(self, key):
        config = getattr(settings, "TIPTAP_SUITE_CONFIG", {})
        return config[key]

    def __contains__(self, key):
        config = getattr(settings, "TIPTAP_SUITE_CONFIG", {})
        return key in config
        
    def items(self):
        config = getattr(settings, "TIPTAP_SUITE_CONFIG", {})
        return config.items()

    def keys(self):
        config = getattr(settings, "TIPTAP_SUITE_CONFIG", {})
        return config.keys()

    def __iter__(self):
        config = getattr(settings, "TIPTAP_SUITE_CONFIG", {})
        return iter(config)

TIPTAP_SUITE_CONFIG = TiptapSuiteConfigProxy()
