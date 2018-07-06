
                
                var u = new window.Swiper({
                        container: document.querySelector(".lg-page-container"),
                        isVertical: "horizontal" ,
                        initIndex: "single",
                        isLoop: true,
                        keepDefaultClasses: ["keep-default"]
                    });
                u.on("activePageChanged", function (e) {
                    var t = u.currentPage.index,
                        a = u.activePage.index;
                    r.prepare(a, 0), r.enter(a, i.pages.length), p.trigger("pageChangeStart", t + "_" + i.pages.length)
                }), u.on("swipeChanged", function () {
                    setTimeout(function () {
                        var e = u.currentPage.index;
                        r.setShareInfo(i.pages[e]), p.trigger("pageChangeEnd", e + "_" + i.pages.length), p.trigger("pageReach", e + 1 + "_" + i.pages.length)
                    }, 0)
                }), r.prepare(t, 0), r.enter(t, i.pages.length), r.setShareInfo(i.pages[t]), p.trigger("pageReach", t + 1 + "_" + i.pages.length);
                var f = document.querySelector(".lg-container");
                f.addEventListener("touchstart", a, !1), f.addEventListener("touchmove", a, !1), this.swiper = u
        
            function gotoPage (e, t) {
                if (this.swiper) switch (e) {
                    case "next":
                        this.swiper.swipeNext(t);
                        break;
                    case "prev":
                        this.swiper.swipePrev(t);
                        break;
                    default:
                        r.prepare(e, 0), this.swiper.swipeTo(e, t)
                }
            }
            function getSwipeForbidDirection () {
                if (!this.swiper) return "none";
                var e = this.swiper.getCurrentIndex(),
                    t = n.get(),
                    i = t.pages[e].attributes;
                return i && i.swipeForbidden ? i.swipeForbidden : "none"
            }
            function onresize() {
                this.swiper.reinit()
            }
            function destroy () {
                this.swiper.destroy()
            }