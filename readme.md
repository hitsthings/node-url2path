#Url2Path

Take urls, and encode them in a format that is a valid filepath on any OS.

url2path(url, [optional] rootDirectory)
Construct an absolute file path underneath the given rootDirectory, or process.cwd() if no root is provided.

url2path.url2pathRelative(url)
Construct a relative filepath from the given url.

url2path.path2url(filepath, [optional] fallbackSchema)
Construct a URL from a previously transformed url filepath. If a schema can't be determined from the URL, the fallbackSchema will be prepended to the url.

url2path.encodePathComponent(str)
The encoding transform used to ensure components of the path are valid file/directory names.

url2path.decodePathComponent
The decoding transform that pairs it.

url2path.encodeURIComponent
This is the global encodeURIComponent function, here only for convenience/symmetry. It is used when converting a path to a url.

url2path.decodeURIComponent
This is the global decodeURIComponent function, here only for convenience/symmetry. It is used when converting a url to a path.
