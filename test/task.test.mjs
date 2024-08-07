import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.mjs'; // Adjust the path as needed

chai.use(chaiHttp);
const should = chai.should();

describe('TaskMasterPro API', () => {
    let taskId;

    before((done) => {
        // Setup before tests
        done();
    });

    after((done) => {
        // Cleanup after tests
        done();
    });

    it('should get the root route', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should create a new task', (done) => {
        chai.request(app)
            .post('/tasks')
            .send({ name: 'Test task' })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('Test task');
                taskId = res.body._id;
                done();
            });
    });

    it('should get all tasks', (done) => {
        chai.request(app)
            .get('/tasks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should get a task by ID', (done) => {
        chai.request(app)
            .get(`/tasks/${taskId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(taskId);
                done();
            });
    });

    it('should update a task', (done) => {
        chai.request(app)
            .put(`/tasks/${taskId}`)
            .send({ name: 'Updated task' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('Updated task');
                done();
            });
    });

    it('should delete a task', (done) => {
        chai.request(app)
            .delete(`/tasks/${taskId}`)
            .end((err, res) => {
                res.should.have.status(204); // Expecting 204 No Content
                done();
            });
    });
});
