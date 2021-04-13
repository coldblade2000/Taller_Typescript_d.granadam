import {Student} from "./Student.js";

export var dataStudent = function (index) {
    var list = [
        new Student('Diego Granada', 201922383, 1234566, new Date('2000-06-24'), 'Carrera 16 #128-64', '300123456', 'https://scontent.fbog4-1.fna.fbcdn.net/v/t1.6435-9/46137504_2131229633595661_9138169935925608448_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFKBXS-iDPXzBG-dmeCj7T4eN-11ctwy15437XVy3DLXuauEsAdERaUJBPttEwCt3cffQlkKSmnkgnMm6AvnpGh&_nc_ohc=gM5vIWFuhVUAX-OrdJK&_nc_ht=scontent.fbog4-1.fna&oh=06a537135f787db2b0d68065ca7ee625&oe=6099DFE6'),
        new Student('Pepo Perez', 201922456, 12331223, new Date('2002-06-24'), 'Carrera 32 #256-32', '311234567', 'https://i.kym-cdn.com/photos/images/newsfeed/001/370/937/834.png'),
    ];
    return list[index % list.length];
};
