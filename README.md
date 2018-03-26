# WebTerm

In his original blog post, [Reimagining the browser as a Network OS][network-os], Paul Frazee outlines the idea of a terminal for the web, and more importantly, what an OS built on top of the p2p web might look like. You can view his [original pull request here][original-pr]. This app is a personal attempt at continuing his work.

[network-os]: https://pfrazee.hashbase.io/blog/reimagining-the-browser-as-a-network-os
[original-pr]: https://github.com/beakerbrowser/beaker/pull/589

## Ideas & Goals

Although this project is heavily inspired by Paul's PR, it is a ground up rewrite, and it's still very early on in its development. Some bits are still missing. Ultimately I have a few personal goals with this experiment:

* **It's just a Web App** – The original PR was based on a `term://` protocol built into Beaker itself. Although I'm not ruling out the possibility of this being built into Beaker eventually, most of the current features don't _require_ this to be built into the browser. I want to see how far we can get in userland with nothing but Beaker's core APIs.
* **It's just Dat** - In this experiment, your file system is built on top of dat. Consiquentially, this experiment should take full advantage of everything dat has to offer. You should be able to:
  1.  Easily sync your workspace between multiple devices.
  2.  Quickly undo changes to your filesystem (never fear `rm -rf` again).
  3.  Easily collaborate with multiple authors on projects (w/ multiwritter)
* **User Friendliness** – The terminal is notoriously scary for new developers. What if we changed that? What if commands and their APIs were discoverable? What if documentation was consistantly available? How can we maintain the power of the terminal while simultaneously removing some of its footguns?
* **Multi Language** – One important piece that I would like to explore is the ability to write commands with Web Assembly. Although the current wasm API is limited I would like to provide first-class support in the command spec. That way if you want to write your commands in Rust or something similar and run them in the browser, you can.

## Contributing

The current project is so young that I'm not really looking for contributors ATM, but nevertheless I would love to hear your ideas. Feel free to [post an issue][] or message me [on twitter][]. I also stream this project's development live [on twitch][].

[on twitter]: https://twitter.com/webdesserts
[on twitch]: https://www.twitch.tv/webdesserts
[post an issue]: https://github.com/webdesserts/webterm/issues
