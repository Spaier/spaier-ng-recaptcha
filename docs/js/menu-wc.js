'use strict';



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

customElements.define('compodoc-menu', function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.isNormalMode = _this.getAttribute('mode') === 'normal';
        return _this;
    }

    _createClass(_class, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.render(this.isNormalMode);
        }
    }, {
        key: 'render',
        value: function render(isNormalMode) {
            let tp = lithtml.html(
'<nav>\n    <ul class="list">\n        <li class="title">\n            \n                <a href="index.html" data-type="index-link">spaier-ng-recaptcha documentation</a>\n            \n        </li>\n\n        <li class="divider"></li>\n        ' + (isNormalMode ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>' : '') + '\n        <li class="chapter">\n            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n            <ul class="links">\n                \n                    <li class="link">\n                        <a href="overview.html" data-type="chapter-link">\n                            <span class="icon ion-ios-keypad"></span>Overview\n                        </a>\n                    </li>\n                    <li class="link">\n                        <a href="index.html" data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>README\n                        </a>\n                    </li>\n                \n                \n                    <li class="link">\n                        \n                            <a href="changelog.html"\n                        \n                        data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>CHANGELOG\n                        </a>\n                    </li>\n                \n                    <li class="link">\n                        \n                            <a href="contributing.html"\n                        \n                        data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>CONTRIBUTING\n                        </a>\n                    </li>\n                \n                    <li class="link">\n                        \n                            <a href="license.html"\n                        \n                        data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>LICENSE\n                        </a>\n                    </li>\n                \n                \n            </ul>\n        </li>\n        \n        \n        <li class="chapter modules">\n            <a data-type="chapter-link" href="modules.html">\n                <div class="menu-toggler linked" data-toggle="collapse"\n                    ' + (isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"') + '>\n                    <span class="icon ion-ios-archive"></span>\n                    <span class="link-name">Modules</span>\n                    <span class="icon ion-ios-arrow-down"></span>\n                </div>\n            </a>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"') + '>\n                \n                    <li class="link">\n                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AppModule-3ba1f608693c11d433d22a517b2e1860"' : 'data-target="#xs-components-links-module-AppModule-3ba1f608693c11d433d22a517b2e1860"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AppModule-3ba1f608693c11d433d22a517b2e1860"' : 'id="xs-components-links-module-AppModule-3ba1f608693c11d433d22a517b2e1860"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/DirectiveComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DirectiveComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/ReactiveComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReactiveComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/TemplateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/RecaptchaDirectiveModule.html" data-type="entity-link">RecaptchaDirectiveModule</a>\n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#directives-links-module-RecaptchaDirectiveModule-a202a81def883c8bbb11f8bcf58db2fe"' : 'data-target="#xs-directives-links-module-RecaptchaDirectiveModule-a202a81def883c8bbb11f8bcf58db2fe"') + '>\n                                    <span class="icon ion-md-code-working"></span>\n                                    <span>Directives</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="directives-links-module-RecaptchaDirectiveModule-a202a81def883c8bbb11f8bcf58db2fe"' : 'id="xs-directives-links-module-RecaptchaDirectiveModule-a202a81def883c8bbb11f8bcf58db2fe"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="directives/RecaptchaDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecaptchaDirective</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/RecaptchaFormsModule.html" data-type="entity-link">RecaptchaFormsModule</a>\n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#directives-links-module-RecaptchaFormsModule-22a994ae29b3d56cbabaa3037de41afe"' : 'data-target="#xs-directives-links-module-RecaptchaFormsModule-22a994ae29b3d56cbabaa3037de41afe"') + '>\n                                    <span class="icon ion-md-code-working"></span>\n                                    <span>Directives</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="directives-links-module-RecaptchaFormsModule-22a994ae29b3d56cbabaa3037de41afe"' : 'id="xs-directives-links-module-RecaptchaFormsModule-22a994ae29b3d56cbabaa3037de41afe"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="directives/RecaptchaDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecaptchaDirective</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/RecaptchaLoaderModule.html" data-type="entity-link">RecaptchaLoaderModule</a>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        \n            \n                <li class="chapter">\n                    <div class="simple menu-toggler" data-toggle="collapse"\n                    ' + (isNormalMode ? 'data-target="#directives-links"' : 'data-target="#xs-directives-links"') + '>\n                        <span class="icon ion-md-code-working"></span>\n                        <span>Directives</span>\n                        <span class="icon ion-ios-arrow-down"></span>\n                    </div>\n                    <ul class="links collapse"\n                    ' + (isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"') + '>\n                        \n                            <li class="link">\n                                <a href="directives/RecaptchaValueAccessorDirective.html" data-type="entity-link">RecaptchaValueAccessorDirective</a>\n                            </li>\n                        \n                    </ul>\n                </li>\n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"') + '>\n                <span class="icon ion-ios-paper"></span>\n                <span>Classes</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"') + '>\n                \n                    <li class="link">\n                        <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n                <li class="chapter">\n                    <div class="simple menu-toggler" data-toggle="collapse"\n                        ' + (isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"') + '>\n                        <span class="icon ion-md-arrow-round-down"></span>\n                        <span>Injectables</span>\n                        <span class="icon ion-ios-arrow-down"></span>\n                    </div>\n                    <ul class="links collapse"\n                    ' + (isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"') + '>\n                        \n                            <li class="link">\n                                <a href="injectables/RecaptchaOnloadService.html" data-type="entity-link">RecaptchaOnloadService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/RecaptchaService.html" data-type="entity-link">RecaptchaService</a>\n                            </li>\n                        \n                    </ul>\n                </li>\n            \n        \n        \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n                ' + (isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"') + '>\n                <span class="icon ion-md-information-circle-outline"></span>\n                <span>Interfaces</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"') + '>\n                \n                    <li class="link">\n                        <a href="interfaces/Recaptcha.html" data-type="entity-link">Recaptcha</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/RecaptchaExecuteParameters.html" data-type="entity-link">RecaptchaExecuteParameters</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/RecaptchaParameters.html" data-type="entity-link">RecaptchaParameters</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"') + '>\n                <span class="icon ion-ios-cube"></span>\n                <span>Miscellaneous</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"') + '>\n                \n                    <li class="link">\n                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>\n                    </li>\n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                    </li>\n                \n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n            <li class="chapter">\n                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>\n            </li>\n            \n        \n        \n        <li class="chapter">\n            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n        </li>\n        \n        \n        \n        <li class="divider"></li>\n        <li class="copyright">\n                Documentation generated using <a href="https://compodoc.app/" target="_blank">\n                    \n                        \n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        \n                    \n                </a>\n        </li>\n        \n    </ul>\n</nav>'
);
        this.innerHTML = tp.strings;
        }
    }]);

    return _class;
}(HTMLElement));