describe("video caption component", function() {
  var t, C, c, node = {
    videos : [
      { caption : 'video caption' }
    ]
  };

  beforeEach(function() {
    dojo.require('toura.components.VideoCaption');

    t = dojo.byId('test');

    if (c) { c.destroy(); }

    C = toura.components.VideoCaption;
  });

  it("should display the node body text", function() {
    c = C({ node : node }).placeAt(t);
    expect(t.innerHTML).toMatch(node.videos[0].caption);
    expect(t.querySelector(getRootSelector(c))).toBeTruthy();
  });

  it("should display no text if no node is provided", function() {
    expect(function() {
      c = C({ }).placeAt(t);
    }).not.toThrow();

    expect(dojo.trim(c.bodyTextContainer.innerHTML)).toBe('');
  });

  it("should display no text if the video does not have a caption", function() {
    c = C({ node : { videos : [ {} ] } });
    expect(dojo.trim(c.bodyTextContainer.innerHTML)).toBe('');
  });

  it("should allow the caption to be changed", function() {
    var txt2 = 'text test';

    c = C({ node : node }).placeAt(t);

    c.set('content', txt2);
    expect(t.innerHTML).not.toMatch(node.videos[0].caption);
    expect(t.innerHTML).toMatch(txt2);
  });
  
  it("should use the center class when provided very little text", function() {
    var shorttext = "Test";
    
    c = C({ node : node }).placeAt(t);
    
    c.set('content', shorttext);
    expect(dojo.hasClass(c.domNode, 'caption-center')).toBe(true);
  });
  
  it("should remove the center class when provided lots of text", function() {
    // this is surely long enough to wrap...
    var longtext = 'Fourscore and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation or any nation so conceived and so dedicated can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field as a final resting-place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But in a larger sense, we cannot dedicate, we cannot consecrate, we cannot hallow this ground. The brave men, living and dead who struggled here have consecrated it far above our poor power to add or detract. The world will little note nor long remember what we say here, but it can never forget what they did here. It is for us the living rather to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us--that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion--that we here highly resolve that these dead shall not have died in vain, that this nation under God shall have a new birth of freedom, and that government of the people, by the people, for the people shall not perish from the earth.';
    
    c = C({ node: node }).placeAt(t);
      
    c.set('content', longtext);
    expect(dojo.hasClass(c.domNode, 'caption-center')).toBe(false);
  });

});


