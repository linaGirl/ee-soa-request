var assert = require('assert')
    Request = require('../');

var Format = Request.Format;

describe('Request', function(){

    describe('#getCollection()', function(){
        var req = new Request();
        it('returns the collection/controller we are accessing (independent of the fact that there could a resource id set!', function(){
            req.setCollection('post');
            assert.equal('post', req.getCollection());
        });
    });

    describe('#getController()', function(){
        var req = new Request();
        it('returns the result of get collection -> the controller', function(){
            req.setCollection('post');
            assert.equal(req.getCollection(), req.getController());
        });
    });

    describe('#setLanguages()', function(){
        var req = new Request();

        it('converts languages to lower case', function(){
            req.setLanguages(['en_US']);
            assert.deepEqual(['en_us'], req.getLanguages());
        });
    });

    describe('#acceptsLanguage()', function(){
        var req = new Request();
        it('returns false if empty', function(){
            req.setLanguages([]);
            assert.equal(false, req.acceptsLanguage('en_US'));
        });

        it('returns false if language is not accepted', function(){
            req.setLanguages(['en_US', 'de_DE']);
            assert.equal(false, req.acceptsLanguage('fr_FR'));
        });

        it('returns true if language is accepted', function(){
            req.setLanguages(['en_US', 'de_DE']);
            assert.equal(true, req.acceptsLanguage('en_US'));
            assert.equal(true, req.acceptsLanguage('de_DE'));
        });

        it('is case insensitive', function(){
            req.setLanguages(['en_US', 'de_DE']);
            assert.equal(true, req.acceptsLanguage('En_uS'));
            assert.equal(true, req.acceptsLanguage('De_De'));
        });

    });

    describe('#setRange()', function(){
        it('should set the range correctly', function(){
            var req = new Request();
            req.setRange(0, 10);
            assert.equal(req.getRange().from, 0);
            assert.equal(req.getRange().to, 10);
        });
    });

    describe('#acceptsFormat()', function(){

        it('returns false if empty', function(){
            var req = new Request();
            assert(!req.acceptsFormat());
        });

        it('returns true if format is is accepted', function(){
            var req = new Request();
            req.addFormat('application', 'json');
            assert(req.acceptsFormat('application', 'json'));
        });

        it('returns false if format is not accepted', function(){
            var req = new Request();
            req.addFormat('application', 'json');
            assert(!req.acceptsFormat('text', 'plain'));
        });

        it('provides parameters with fallbacks', function(){
            var req = new Request().setParameters({one: 2, two: true})
            assert.strictEqual(2, req.getParameter('one'));
            assert.strictEqual(true, req.getParameter('two'));
            assert.strictEqual('fallback', req.getParameter('three', 'fallback'));
        });
    });

    describe('Child Classes (Quick and dirty)', function(){
        it('should be possible to initialize all child classes', function(){
            new Request.InfoRequest();
            new Request.OptionsRequest();
            new Request.ReadRequest();
            new Request.UpdateRequest();
            new Request.WriteRequest();
            new Request.DeleteRequest();
            new Request.CreateRequest();
        });
    });
});
